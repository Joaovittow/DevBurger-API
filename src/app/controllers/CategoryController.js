import { unlink } from 'node:fs/promises';
import { resolve } from 'node:path';
import * as Yup from 'yup';
import { deleteFromCloudinary, isCloudinaryUrl } from '../../utils/cloudinary';
import Category from '../models/Category';
import User from '../models/User';

class CategoryController {
  async store(req, res) {
    const schema = Yup.object({
      name: Yup.string().required(),
    });

    try {
      schema.validateSync(req.body, { abortEarly: false });
    } catch (err) {
      return res.status(400).json({ error: err.errors });
    }

    const { admin: isAdmin } = await User.findByPk(req.userId);

    if (!isAdmin) {
      return res.status(401).json();
    }

    if (!req.file?.path) {
      return res.status(400).json({ error: 'Image upload failed' });
    }

    const path = req.file.path;
    const { name } = req.body;

    const categoryExists = await Category.findOne({
      where: {
        name,
      },
    });

    if (categoryExists) {
      return res.status(400).json({ error: 'Category already exists' });
    }

    const { id } = await Category.create({
      name,
      path,
    });

    return res.status(201).json({ id, name });
  }
  async update(req, res) {
    const schema = Yup.object({
      name: Yup.string(),
    });

    try {
      schema.validateSync(req.body, { abortEarly: false });
    } catch (err) {
      return res.status(400).json({ error: err.errors });
    }

    const { admin: isAdmin } = await User.findByPk(req.userId);

    if (!isAdmin) {
      return res.status(401).json();
    }

    const { id } = req.params;

    const categoryExists = await Category.findByPk(id);

    if (!categoryExists) {
      return res.status(400).json({ error: 'Make sure your ID is correct' });
    }

    const { name } = req.body;

    if (name) {
      const categoryNameExists = await Category.findOne({
        where: {
          name,
        },
      });

      if (categoryNameExists && categoryNameExists.id !== +id) {
        return res.status(400).json({ error: 'Category already exists' });
      }
    }

    const updateData = {};

    if (name !== undefined) {
      updateData.name = name;
    }

    if (req.file?.path) {
      const previousPath = categoryExists.path;
      updateData.path = req.file.path;

      await categoryExists.update(updateData);

      if (previousPath) {
        if (isCloudinaryUrl(previousPath)) {
          await deleteFromCloudinary(previousPath);
        } else {
          const filePath = resolve(
            __dirname,
            '..',
            '..',
            '..',
            'uploads',
            previousPath,
          );

          try {
            await unlink(filePath);
          } catch (_err) {
            // Se o arquivo não existir, continua com a atualização
          }
        }
      }

      return res.status(200).json();
    }

    await categoryExists.update(updateData);

    return res.status(200).json();
  }

  async index(_req, res) {
    const categories = await Category.findAll();

    return res.json(categories);
  }

  async delete(req, res) {
    const { admin: isAdmin } = await User.findByPk(req.userId);

    if (!isAdmin) {
      return res.status(401).json();
    }

    const { id } = req.params;

    const category = await Category.findByPk(id);

    if (!category) {
      return res.status(400).json({ error: 'Make sure your ID is correct' });
    }

    if (category.path) {
      if (isCloudinaryUrl(category.path)) {
        await deleteFromCloudinary(category.path);
      } else {
        const filePath = resolve(
          __dirname,
          '..',
          '..',
          '..',
          'uploads',
          category.path,
        );

        try {
          await unlink(filePath);
        } catch (_err) {
          // Se o arquivo não existir, continua com a exclusão
        }
      }
    }

    await Category.destroy({
      where: {
        id,
      },
    });

    return res.status(200).json();
  }
}

export default new CategoryController();
