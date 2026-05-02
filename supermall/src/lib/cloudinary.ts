import { Cloudinary } from '@cloudinary/url-gen';
import { quality } from '@cloudinary/url-gen/actions/delivery';
import { auto } from '@cloudinary/url-gen/actions/resize';
import { autoGravity } from '@cloudinary/url-gen/qualifiers/gravity';

// Replace VITE_CLOUDINARY_CLOUD_NAME in your .env file
export const cld = new Cloudinary({
  cloud: {
    cloudName: import.meta.env.VITE_CLOUDINARY_CLOUD_NAME ?? 'demo',
  },
});

// Returns a responsive, auto-quality, auto-format image URL
export function buildImageUrl(
  publicId: string,
  options?: { width?: number; height?: number }
) {
  const img = cld.image(publicId);

  if (options?.width || options?.height) {
    img.resize(
      auto()
        .width(options.width ?? 0)
        .height(options.height ?? 0)
        .gravity(autoGravity())
    );
  }

  img.delivery(quality('auto'));

  return img.toURL();
}
