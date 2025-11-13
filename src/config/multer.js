import { extname } from 'node:path';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import { v4 } from 'uuid';

import cloudinary from '../lib/cloudinary';

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: 'devburger',
    public_id: () => v4(),
    format: async (_req, file) => {
      const extension = extname(file.originalname)?.replace('.', '');
      return extension || undefined;
    },
    resource_type: 'image',
  },
});

export default {
  storage,
};
