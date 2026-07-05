type CloudinaryOptions = {
  width?: number;
  quality?: number;
  /** Crop to this height (used with width). Enables c_fill,g_auto subject-aware cropping. */
  height?: number;
};

const DEFAULT_TRANSFORMS = 'f_auto';

export function optimizeCloudinaryUrl(url: string, options: CloudinaryOptions = {}): string {
  if (!url || !url.includes('res.cloudinary.com') || !url.includes('/upload/')) {
    return url;
  }

  const transforms = [DEFAULT_TRANSFORMS];
  if (options.width) transforms.push(`w_${options.width}`);
  if (options.height) {
    // Fixed aspect crop, keeping the main subject in frame
    transforms.push(`h_${options.height}`, 'c_fill', 'g_auto');
  }
  if (options.quality) {
    transforms.push(`q_${options.quality}`);
  } else {
    transforms.push('q_auto');
  }

  return url.replace('/upload/', `/upload/${transforms.join(',')}/`);
}
