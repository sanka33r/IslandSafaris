type CloudinaryOptions = {
  width?: number;
  quality?: number;
};

const DEFAULT_TRANSFORMS = 'f_auto,q_auto';

export function optimizeCloudinaryUrl(url: string, options: CloudinaryOptions = {}): string {
  if (!url || !url.includes('res.cloudinary.com') || !url.includes('/upload/')) {
    return url;
  }

  const transforms = [DEFAULT_TRANSFORMS];
  if (options.width) transforms.push(`w_${options.width}`);
  if (options.quality) transforms.push(`q_${options.quality}`);

  return url.replace('/upload/', `/upload/${transforms.join(',')}/`);
}
