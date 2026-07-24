"use server";

const API_KEY = process.env.NEXT_PUBLIC_YOUTUBE_API_KEY;
const CHANNEL_A = process.env.NEXT_PUBLIC_YOUTUBE_CHANNEL_A_ID;
const CHANNEL_B = process.env.NEXT_PUBLIC_YOUTUBE_CHANNEL_B_ID;

export interface YouTubeVideo {
  videoId: string;
  title: string;
  publishedAt: string;
  thumbnail: string;
  channelTitle: string;
}

export async function getRecentVideos(): Promise<YouTubeVideo[]> {
  if (!API_KEY) return [];
  try {
    const resA = await fetch(
      `https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=${CHANNEL_A}&maxResults=8&order=date&type=video&key=${API_KEY}`,
      { next: { revalidate: 3600 } }
    );
    const resB = await fetch(
      `https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=${CHANNEL_B}&maxResults=8&order=date&type=video&key=${API_KEY}`,
      { next: { revalidate: 3600 } }
    );

    const dataA = await resA.json();
    const dataB = await resB.json();

    const itemsA = dataA.items || [];
    const itemsB = dataB.items || [];

    const combined = [...itemsA, ...itemsB].map((item: any) => ({
      videoId: item.id.videoId,
      title: item.snippet.title,
      publishedAt: item.snippet.publishedAt,
      thumbnail: item.snippet.thumbnails?.medium?.url || "",
      channelTitle: item.snippet.channelTitle,
    }));

    // Sort descending by date
    combined.sort(
      (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
    );

    return combined.slice(0, 12);
  } catch (error) {
    console.error("Error fetching YouTube videos:", error);
    return [];
  }
}

export async function getLiveStatus(): Promise<YouTubeVideo | null> {
  if (!API_KEY) return null;
  try {
    const resA = await fetch(
      `https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=${CHANNEL_A}&eventType=live&type=video&key=${API_KEY}`,
      { next: { revalidate: 60 } }
    );
    const dataA = await resA.json();
    if (dataA.items && dataA.items.length > 0) {
      const item = dataA.items[0];
      return {
        videoId: item.id.videoId,
        title: item.snippet.title,
        publishedAt: item.snippet.publishedAt,
        thumbnail: item.snippet.thumbnails?.medium?.url || "",
        channelTitle: item.snippet.channelTitle,
      };
    }

    if (CHANNEL_B) {
      const resB = await fetch(
        `https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=${CHANNEL_B}&eventType=live&type=video&key=${API_KEY}`,
        { next: { revalidate: 60 } }
      );
      const dataB = await resB.json();
      if (dataB.items && dataB.items.length > 0) {
        const item = dataB.items[0];
        return {
          videoId: item.id.videoId,
          title: item.snippet.title,
          publishedAt: item.snippet.publishedAt,
          thumbnail: item.snippet.thumbnails?.medium?.url || "",
          channelTitle: item.snippet.channelTitle,
        };
      }
    }

    return null;
  } catch (error) {
    console.error("Error fetching live status:", error);
    return null;
  }
}
