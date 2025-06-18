// utils/videoParser.ts

const FACEBOOK_PATTERNS = [
  /facebook\.com\/[^/]+\/videos\/(\d+)/,      // /Page/videos/123
  /facebook\.com\/watch\/?\?v=(\d+)/,         // /watch?v=123
  /facebook\.com\/video\.php\?v=(\d+)/        // /video.php?v=123
];

export function extractYouTubeVideoId(url: string): string | null {
  const regex = /(?:youtube\.com\/(?:watch\?v=|embed\/|shorts\/)|youtu\.be\/)([0-9A-Za-z_-]{11})/;
  const match = url.match(regex);
  return match ? match[1] : null;
}

export function extractFacebookVideoId(url: string): string | null {
  for (const pattern of FACEBOOK_PATTERNS) {
    const match = url.match(pattern);
    if (match?.[1]) {
      return match[1];
    }
  }
  return null;
}

export function getCanonicalFacebookVideoUrl(url: string, videoId: string): string {
  const pageMatch = url.match(/facebook\.com\/([^/?#]+)\/videos/);
  const pageSlug = pageMatch?.[1];
  return pageSlug
    ? `https://www.facebook.com/${pageSlug}/videos/${videoId}`
    : `https://www.facebook.com/video.php?v=${videoId}`;
}

export function getEmbedUrl(videoUrl: string): string {
  const facebookAppId = process.env.NEXT_PUBLIC_FACEBOOK_APP_ID;

  // YouTube
  if (videoUrl.includes("youtube.com") || videoUrl.includes("youtu.be")) {
    const videoId = extractYouTubeVideoId(videoUrl);
    if (videoId) {
      return `https://www.youtube.com/embed/${videoId}`;
    }
  }

  // Facebook
  if (videoUrl.includes("facebook.com")) {
    if (videoUrl.includes("/reel/")) {
      return "ERROR: Facebook Reels are not supported.";
    }

    const fbVideoId = extractFacebookVideoId(videoUrl);
    if (!fbVideoId) {
      return "ERROR: Facebook video is private or unsupported.";
    }

    const canonicalUrl = getCanonicalFacebookVideoUrl(videoUrl, fbVideoId);
    let embedUrl = `https://www.facebook.com/plugins/video.php?href=${encodeURIComponent(canonicalUrl)}`;
    if (facebookAppId) {
      embedUrl += `&appId=${facebookAppId}`;
    }
    return embedUrl;
  }

  return "ERROR: Unsupported video URL.";
}
