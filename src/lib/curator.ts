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

        if (score && !score.isHype && score.utilityScore >= 7) {
            curatedList.push({
                id: videoId,
                title: title,
                channelTitle: channelTitle || 'Unknown',
                thumbnailUrl: video.snippet?.thumbnails?.high?.url || '',
                videoUrl: `https://www.youtube.com/watch?v=${videoId}`,
                publishedAt: publishedAt || new Date().toISOString(),
                utilityScore: score.utilityScore,
                summary: score.summary,
            });
        }
    }

    // 3. Sort by Utility Score (Desc) and Limit to 5
    return curatedList.sort((a, b) => b.utilityScore - a.utilityScore).slice(0, 5);
}
