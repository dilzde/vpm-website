// Read server-only environment variables (with safe client-var fallback during transition)
const API_KEY = process.env.YOUTUBE_API_KEY || process.env.NEXT_PUBLIC_YOUTUBE_API_KEY;
const CHANNEL_A = process.env.YOUTUBE_CHANNEL_A_ID || process.env.NEXT_PUBLIC_YOUTUBE_CHANNEL_A_ID || "UC5z_MlBqT0-uB9Y6IQlD68A";
const CHANNEL_B = process.env.YOUTUBE_CHANNEL_B_ID || process.env.NEXT_PUBLIC_YOUTUBE_CHANNEL_B_ID || "UCcvFW-VNXVDJBTYYDLTM6qw";

export interface YouTubeVideo {
  videoId: string;
  title: string;
  publishedAt: string;
  thumbnail: string;
  channelTitle: string;
  channelId?: string;
}

// Bug 2 Fix: Never use Unsplash stock photography in fallbacks or mock data.
// Passing empty string for thumbnail forces the frontend UI to display authentic VPM illustrated placeholders (PlaceholderSermon / PlaceholderCongregation).
const MOCK_RECENT_VIDEOS: YouTubeVideo[] = [
  {
    videoId: "placeholder1",
    title: "Sunday Worship Service - Faith & Victory",
    publishedAt: new Date().toISOString(),
    thumbnail: "",
    channelTitle: "Asriel TV",
    channelId: CHANNEL_A
  },
  {
    videoId: "placeholder2",
    title: "Midweek Teaching: Walking in the Spirit & Truth",
    publishedAt: new Date(Date.now() - 86400000 * 3).toISOString(),
    thumbnail: "",
    channelTitle: "Asriel TV",
    channelId: CHANNEL_A
  },
  {
    videoId: "placeholder3",
    title: "Night of Deliverance, Worship & Healing",
    publishedAt: new Date(Date.now() - 86400000 * 7).toISOString(),
    thumbnail: "",
    channelTitle: "Voice of the Potter",
    channelId: CHANNEL_B
  },
  {
    videoId: "placeholder4",
    title: "International Intercessors Prayer Summit",
    publishedAt: new Date(Date.now() - 86400000 * 14).toISOString(),
    thumbnail: "",
    channelTitle: "Voice of the Potter",
    channelId: CHANNEL_B
  }
];

const MOCK_LIVE_VIDEO: YouTubeVideo = {
  videoId: "live-placeholder",
  title: "LIVE: Sunday Worship & Prophetic Encounters",
  publishedAt: new Date().toISOString(),
  thumbnail: "",
  channelTitle: "Asriel TV",
  channelId: CHANNEL_A
};

/**
 * Converts a YouTube Channel ID starting with "UC" into its static uploads Playlist ID starting with "UU".
 * This allows fetching uploads via playlistItems.list (1 quota unit) instead of search.list (100 quota units).
 */
function getUploadsPlaylistId(channelId?: string): string {
  if (!channelId || !channelId.startsWith("UC")) return "";
  return "UU" + channelId.slice(2);
}

async function fetchChannelUploads(channelId: string, limit: number = 8): Promise<YouTubeVideo[]> {
  if (!API_KEY || !channelId) return [];
  
  const playlistId = getUploadsPlaylistId(channelId);
  if (!playlistId) return [];

  try {
    const res = await fetch(
      `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=${playlistId}&maxResults=${limit}&key=${API_KEY}`,
      { next: { revalidate: 3600 } }
    );
    
    const data = await res.json();
    if (data.error) {
      console.warn(`[YouTube API Warning - playlistItems]: ${data.error.message || JSON.stringify(data.error)}`);
      return [];
    }

    const items = data.items || [];
    return items.map((item: any) => {
      const snippet = item.snippet || {};
      const videoId = snippet.resourceId?.videoId || item.id;
      return {
        videoId: videoId,
        title: snippet.title || "Untitled Video",
        publishedAt: snippet.publishedAt || new Date().toISOString(),
        thumbnail: snippet.thumbnails?.high?.url || snippet.thumbnails?.medium?.url || "",
        channelTitle: snippet.channelTitle || "VPM International",
        channelId: snippet.channelId || channelId
      };
    }).filter((v: YouTubeVideo) => v.title !== "Private video" && v.title !== "Deleted video");
  } catch (err) {
    console.warn(`[YouTube Fetch Network Error - ${channelId}]:`, err);
    return [];
  }
}

/**
 * Retrieves recent uploaded videos across Channel A and Channel B using low-quota playlistItems endpoint.
 * Accepts an optional targetChannelId to filter by a specific channel for tabbed sub-navigation.
 */
export async function getRecentVideos(targetChannelId?: string): Promise<YouTubeVideo[]> {
  if (!API_KEY) {
    console.warn("[YouTube API Notice]: No YOUTUBE_API_KEY defined. Serving fallback mock content with illustrated placeholders.");
    if (targetChannelId) {
      return MOCK_RECENT_VIDEOS.filter(v => v.channelId === targetChannelId || targetChannelId === "all");
    }
    return MOCK_RECENT_VIDEOS;
  }

  try {
    let combined: YouTubeVideo[] = [];

    if (targetChannelId && targetChannelId !== "all") {
      combined = await fetchChannelUploads(targetChannelId, 12);
    } else {
      const [videosA, videosB] = await Promise.all([
        fetchChannelUploads(CHANNEL_A, 8),
        fetchChannelUploads(CHANNEL_B, 8)
      ]);
      combined = [...videosA, ...videosB];
    }

    if (combined.length === 0) {
      console.warn("[YouTube API Notice]: No items returned from live API. Serving fallback placeholder data.");
      if (targetChannelId && targetChannelId !== "all") {
        return MOCK_RECENT_VIDEOS.filter(v => v.channelId === targetChannelId);
      }
      return MOCK_RECENT_VIDEOS;
    }

    // Sort descending by publication timestamp
    combined.sort(
      (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
    );

    return combined.slice(0, 12);
  } catch (error) {
    console.error("Error retrieving YouTube videos:", error);
    return MOCK_RECENT_VIDEOS;
  }
}

async function checkChannelLive(channelId: string): Promise<YouTubeVideo | null> {
  if (!API_KEY || !channelId) return null;
  try {
    const res = await fetch(
      `https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=${channelId}&eventType=live&type=video&key=${API_KEY}`,
      { next: { revalidate: 60 } }
    );
    const data = await res.json();
    
    if (data.error) {
      console.warn(`[YouTube Live Status API Warning - ${channelId}]: ${data.error.message || JSON.stringify(data.error)}`);
      // When offline or hitting local quota/timeout issues in development, throw to allow fallback testing if desired
      throw new Error(data.error.message || "API Error");
    }

    if (data.items && data.items.length > 0) {
      const item = data.items[0];
      const snippet = item.snippet || {};
      return {
        videoId: item.id.videoId,
        title: snippet.title || "LIVE Service",
        publishedAt: snippet.publishedAt || new Date().toISOString(),
        thumbnail: snippet.thumbnails?.high?.url || snippet.thumbnails?.medium?.url || "",
        channelTitle: snippet.channelTitle || "VPM Live",
        channelId: channelId
      };
    }
    return null;
  } catch (err) {
    console.warn(`[YouTube Live Status Error for ${channelId}]:`, err);
    return null;
  }
}

/**
 * Concurrently checks both Channel A and Channel B independently for an active livestream.
 */
export async function getLiveStatus(): Promise<YouTubeVideo | null> {
  if (!API_KEY) {
    return MOCK_LIVE_VIDEO;
  }

  try {
    // Check both Channel A and B concurrently without short-circuiting on early assumptions
    const [liveA, liveB] = await Promise.all([
      checkChannelLive(CHANNEL_A),
      checkChannelLive(CHANNEL_B)
    ]);

    // Return active live stream (preferring Channel A as primary if both are live simultaneously)
    if (liveA) return liveA;
    if (liveB) return liveB;

    return null;
  } catch (error) {
    console.error("Error checking combined live status:", error);
    return MOCK_LIVE_VIDEO;
  }
}

export { CHANNEL_A, CHANNEL_B };
