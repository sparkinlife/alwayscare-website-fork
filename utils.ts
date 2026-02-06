export const formatTimeAgo = (dateString: string): string => {
  const date = new Date(dateString);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMins / 60);
  const diffDays = Math.floor(diffHours / 24);

  if (diffMins < 1) return 'Just now';
  if (diffMins < 60) return `${diffMins} min ago`;
  if (diffHours < 24) return `${diffHours} hr ago`;
  return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`;
};

export const formatStatus = (status: string): string => {
  return status.replace(/_/g, ' ').toLowerCase().replace(/\b\w/g, c => c.toUpperCase());
};

export function getGoogleDriveThumbnailUrl(url: string | null, width: number = 400): string | null {
  if (!url) return null;
  // Format: /file/d/FILE_ID/...
  let match = url.match(/\/file\/d\/([a-zA-Z0-9_-]+)/);
  if (!match) {
    // Format: ?id=FILE_ID or &id=FILE_ID
    match = url.match(/[?&]id=([a-zA-Z0-9_-]+)/);
  }
  if (match) return `https://drive.google.com/thumbnail?id=${match[1]}&sz=w${width}`;
  // Direct image URL — return as-is
  if (url.match(/\.(jpg|jpeg|png|gif|webp)/i)) return url;
  // Fallback: return original URL
  return url;
}
