import { google } from 'googleapis';

const youtube = google.youtube('v3');

// Whitelist of High-Signal AI Channels (Channel IDs)
// Includes: Claude Code focused creators, Frontier AI educators, Practical AI builders
const WHITELISTED_CHANNELS = [
  'UC2UXDak6o7rBm23k3Vv5dww', // Tina Huang
  'UCd6MoB9NC6uYN2grvUNT-Zg', // Nate B. Jones
  'UC1yNl2E89Q5L6Fp5e5F5D8w', // Andrej Karpathy
  'UCNJ1Ymd5yFuUPtn21xxR7kw', // AI Explained
  'UCzfWju7v2Lij98J_oE_1-Dg', // Yannic Kilcher
  'UC88RC_4egFjV9jfjBHwDuvg', // IndyDevDan (Claude Code specialist)
  'UC6nSFpj9HTCZ5t-N3Rm3-HA', // Vsauce (tech/science perspective)
  'UCpko_-a4wgz2u_DgDgd9fqA', // Fireship (quick tech explainers)
  'UCLLw7jmFsvfIVaUFsLs8mlQ', // All About AI
  'UCblw9VdP-Yz67fVbq0FoKsA', // Anthropic (official)
];

export async function fetchDailyVideos() {
  const apiKey = process.env.YOUTUBE_API_KEY;
  if (!apiKey) {
    console.warn('YOUTUBE_API_KEY is missing. Returning empty list.');
    return [];
  }

  // Extended to 7 days to catch weekly/less frequent uploaders
  const sevenDaysAgo = new Date();
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
  const publishedAfter = sevenDaysAgo.toISOString();

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
        maxResults: 10, // Increased to 10 to catch more candidates
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
