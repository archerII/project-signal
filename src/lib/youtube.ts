import { google } from 'googleapis';

const youtube = google.youtube('v3');

// Initial Whitelist of High-Signal AI Channels (Channel IDs)
// Tina Huang, Nate B. Jones, Andrej Karpathy, AI Explained, Yannic Kilcher
const WHITELISTED_CHANNELS = [
  'UC2UXDak6o7rBm23k3Vv5dww', // Tina Huang
  'UCd6MoB9NC6uYN2grvUNT-Zg', // Nate B. Jones
  'UC1yNl2E89Q5L6Fp5e5F5D8w', // Andrej Karpathy
  'UCNJ1Ymd5yFuUPtn21xxR7kw', // AI Explained
  'UCzfWju7v2Lij98J_oE_1-Dg', // Yannic Kilcher
];

export async function fetchDailyVideos() {
  const apiKey = process.env.YOUTUBE_API_KEY;
  if (!apiKey) {
    console.warn('YOUTUBE_API_KEY is missing. Returning empty list.');
    return [];
  }

  const oneDayAgo = new Date();
  oneDayAgo.setDate(oneDayAgo.getDate() - 1);
  const publishedAfter = oneDayAgo.toISOString();

  const allVideos = [];

  // Note: In production, we should batch these or use RSS to save quota.
  // For v1, we loop (carefully).
  for (const channelId of WHITELISTED_CHANNELS) {
    try {
      const response = await youtube.search.list({
        key: apiKey,
        channelId: channelId,
        part: ['snippet'],
        order: 'date',
        publishedAfter: publishedAfter,
        maxResults: 5, // Fetch more candidates to ensure we have enough after filtering
        type: ['video'],
      });

      if (response.data.items) {
        allVideos.push(...response.data.items);
      }
    } catch (error) {
      console.error(`Error fetching channel ${channelId}:`, error);
    }
  }

  return allVideos;
}
