/**
 * Zenith Regional Asset Optimizer
 */

export const getOptimizedAssetUrl = (path: string, region?: string | null) => {
  // If we had a multi-region CDN, we'd prefix the path here
  // e.g. return `https://${region}.cdn.gettupp.com/${path}`;

  // Currently, we ensure WebP and appropriate sizing via Next.js Image
  // This helper can be extended for localized video content
  if (path.endsWith('.mp4') && region === 'EU') {
    // Theoretically serve a closer mirror
    return path;
  }

  return path;
};
