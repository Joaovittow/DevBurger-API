import multer from 'multer';
import { v4 } from 'uuid';

import { extname, resolve } from 'node:path';

export default {
  storage: multer.diskStorage({
    destination: resolve(__dirname, '..', '..', 'uploads'),
    filename: (req, file, cb) => {
      cb(null, v4() + extname(file.originalname));
    },
  }),
};
