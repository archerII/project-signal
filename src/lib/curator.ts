import { fetchDailyVideos } from './youtube';
import { scoreVideo } from './openai';

export type CuratedVideo = {
    id: string;
    title: string;
    channelTitle: string;
    thumbnailUrl: string;
    videoUrl: string;
    publishedAt: string;
    utilityScore: number;
    summary: string;
};

export async function getCuratedDailyFeed(): Promise<CuratedVideo[]> {
    // 1. Fetch raw videos from whitelist
    const rawVideos = await fetchDailyVideos();

    const curatedList: CuratedVideo[] = [];
    const rejectedHighPotential: (CuratedVideo & { isHype: boolean })[] = [];

    // 2. Score and Filter
    // In a real app, we'd use Promise.allSettled or a queue to avoid rate limits
    for (const video of rawVideos) {
        const { title, description, channelTitle, publishedAt } = video.snippet!;
        const videoId = video.id?.videoId;

        if (!videoId || !title || !description) continue;

        // Skip Shorts (heuristic: usually Shorts aren't returned in 'video' type search easily without duration check, 
        // but we can also check title/description for #shorts)
        if (title.toLowerCase().includes('#shorts')) continue;

        const score = await scoreVideo(title, description, channelTitle || '');

        // Store all scored videos for fallback
        if (score) {
            const enrichedVideo = {
                id: videoId,
                title: title,
                channelTitle: channelTitle || 'Unknown',
                thumbnailUrl: video.snippet?.thumbnails?.high?.url || '',
                videoUrl: `https://www.youtube.com/watch?v=${videoId}`,
                publishedAt: publishedAt || new Date().toISOString(),
                utilityScore: score.utilityScore,
                summary: score.summary,
                isHype: score.isHype
            };

            // Strict Filter: No Hype + Utility Score >= 5 (Lowered from 6)
            if (!score.isHype && score.utilityScore >= 5) {
                curatedList.push(enrichedVideo);
            } else {
                rejectedHighPotential.push(enrichedVideo);
            }
        }
    }

    // Fallback: If no videos passed strict filter, take top 3 from rejected (if they have decent score)
    if (curatedList.length === 0 && rejectedHighPotential.length > 0) {
        // Sort rejected by score
        const bestRejected = rejectedHighPotential
            .sort((a, b) => b.utilityScore - a.utilityScore)
            .slice(0, 3); // Take top 3

        curatedList.push(...bestRejected);
    }

    // 3. Sort by Utility Score (Desc) and Limit to 10
    return curatedList.sort((a, b) => b.utilityScore - a.utilityScore).slice(0, 10);
}
