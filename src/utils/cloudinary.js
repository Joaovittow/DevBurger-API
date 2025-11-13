import cloudinary from '../lib/cloudinary';

const CLOUDINARY_HOST_PATTERN = /res\.cloudinary\.com/i;

export function isCloudinaryUrl(url) {
  if (!url) {
    return false;
  }
  return CLOUDINARY_HOST_PATTERN.test(url);
}

export function extractCloudinaryPublicId(url) {
  if (!isCloudinaryUrl(url)) {
    return null;
  }

  const matches = url.match(/\/upload\/(?:v\d+\/)?([^/.]+(?:\/[^/.]+)*)/);
  if (!matches || !matches[1]) {
    return null;
  }

  return matches[1];
}

export async function deleteFromCloudinary(url) {
  const publicId = extractCloudinaryPublicId(url);

  if (!publicId) {
    return;
  }

  try {
    await cloudinary.uploader.destroy(publicId);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Error deleting asset from Cloudinary', error);
  }
}
