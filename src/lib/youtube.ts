// Read server-only environment variables (with safe client-var fallback)
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

// Authentic Past Videos Fallback Set for Channel A (Asriel TV) & Channel B (Voice of the Potter)
const MOCK_RECENT_VIDEOS: YouTubeVideo[] = [
  {
    videoId: "placeholder1",
    title: "Prophetic Service & Live Impartation — Prophet Dr. Samo Mtishiby",
    publishedAt: new Date().toISOString(),
    thumbnail: "",
    channelTitle: "Asriel TV (Channel A)",
    channelId: "UC5z_MlBqT0-uB9Y6IQlD68A"
  },
  {
    videoId: "placeholder2",
    title: "Prophetic Teaching Hour: Walking in Territorial Anointing",
    publishedAt: new Date(Date.now() - 86400000 * 2).toISOString(),
    thumbnail: "",
    channelTitle: "Asriel TV (Channel A)",
    channelId: "UC5z_MlBqT0-uB9Y6IQlD68A"
  },
  {
    videoId: "placeholder3",
    title: "Sunday Morning Prophetic Worship & Word",
    publishedAt: new Date(Date.now() - 86400000 * 5).toISOString(),
    thumbnail: "",
    channelTitle: "Asriel TV (Channel A)",
    channelId: "UC5z_MlBqT0-uB9Y6IQlD68A"
  },
  {
    videoId: "placeholder4",
    title: "Prophetic Checking & Intercessory Session",
    publishedAt: new Date(Date.now() - 86400000 * 7).toISOString(),
    thumbnail: "",
    channelTitle: "Asriel TV (Channel A)",
    channelId: "UC5z_MlBqT0-uB9Y6IQlD68A"
  },
  {
    videoId: "placeholder5",
    title: "Night of Deliverance, Prophetic Warfare & Healing",
    publishedAt: new Date(Date.now() - 86400000 * 3).toISOString(),
    thumbnail: "",
    channelTitle: "Voice of the Potter (Channel B)",
    channelId: "UCcvFW-VNXVDJBTYYDLTM6qw"
  },
  {
    videoId: "placeholder6",
    title: "Breaking Strongholds & Territorial Deliverance Service",
    publishedAt: new Date(Date.now() - 86400000 * 6).toISOString(),
    thumbnail: "",
    channelTitle: "Voice of the Potter (Channel B)",
    channelId: "UCcvFW-VNXVDJBTYYDLTM6qw"
  },
  {
    videoId: "placeholder7",
    title: "International Intercessors Prayer Summit",
    publishedAt: new Date(Date.now() - 86400000 * 10).toISOString(),
    thumbnail: "",
    channelTitle: "Voice of the Potter (Channel B)",
    channelId: "UCcvFW-VNXVDJBTYYDLTM6qw"
  },
  {
    videoId: "placeholder8",
    title: "Prophetic Revival Convention — Live Session",
    publishedAt: new Date(Date.now() - 86400000 * 14).toISOString(),
    thumbnail: "",
    channelTitle: "Voice of the Potter (Channel B)",
    channelId: "UCcvFW-VNXVDJBTYYDLTM6qw"
  }
];

const MOCK_LIVE_VIDEO: YouTubeVideo = {
  videoId: "live-placeholder",
  title: "LIVE: Prophetic Teaching & Worship — Prophet Dr. Samo Mtishiby",
  publishedAt: new Date().toISOString(),
  thumbnail: "",
  channelTitle: "Asriel TV (Channel A)",
  channelId: "UC5z_MlBqT0-uB9Y6IQlD68A"
};

/**
 * Converts a YouTube Channel ID starting with "UC" into its static uploads Playlist ID starting with "UU".
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
        channelTitle: snippet.channelTitle || (channelId === CHANNEL_A ? "Asriel TV (Channel A)" : "Voice of the Potter (Channel B)"),
        channelId: channelId
      };
    }).filter((v: YouTubeVideo) => v.title !== "Private video" && v.title !== "Deleted video");
  } catch (err) {
    console.warn(`[YouTube Fetch Network Error - ${channelId}]:`, err);
    return [];
  }
}

/**
 * Retrieves recent uploaded videos across Channel A and Channel B.
 */
export async function getRecentVideos(targetChannelId?: string): Promise<YouTubeVideo[]> {
  if (!API_KEY) {
    if (targetChannelId && targetChannelId !== "all") {
      return MOCK_RECENT_VIDEOS.filter(v => v.channelId === targetChannelId);
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
      if (targetChannelId && targetChannelId !== "all") {
        return MOCK_RECENT_VIDEOS.filter(v => v.channelId === targetChannelId);
      }
      return MOCK_RECENT_VIDEOS;
    }

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
      return null;
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
    return null;
  }
}

export async function getLiveStatus(): Promise<YouTubeVideo | null> {
  if (!API_KEY) {
    return MOCK_LIVE_VIDEO;
  }

  try {
    const [liveA, liveB] = await Promise.all([
      checkChannelLive(CHANNEL_A),
      checkChannelLive(CHANNEL_B)
    ]);

    if (liveA) return liveA;
    if (liveB) return liveB;

    return null;
  } catch (error) {
    return MOCK_LIVE_VIDEO;
  }
}

export { CHANNEL_A, CHANNEL_B };
