import { unlink } from 'node:fs/promises';
import { resolve } from 'node:path';
import * as Yup from 'yup';
import { deleteFromCloudinary, isCloudinaryUrl } from '../../utils/cloudinary';
import Category from '../models/Category';
import Product from '../models/Product';
import User from '../models/User';

class ProductController {
  async store(req, res) {
    const schema = Yup.object({
      name: Yup.string().required(),
      price: Yup.number().required(),
      category_id: Yup.number().required(),
      offer: Yup.boolean(),
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
    const { name, price, category_id, offer } = req.body;

    const product = await Product.create({
      name,
      price,
      category_id,
      path,
      offer,
    });

    return res.status(201).json(product);
  }

  async update(req, res) {
    const schema = Yup.object({
      name: Yup.string(),
      price: Yup.number(),
      category_id: Yup.number(),
      offer: Yup.boolean(),
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

    const product = await Product.findByPk(id);

    if (!product) {
      return res.status(400).json({ error: 'Make sure your ID is correct' });
    }

    const { name, price, category_id, offer } = req.body;

    const updateData = {};

    if (name !== undefined) {
      updateData.name = name;
    }
    if (price !== undefined) {
      updateData.price = price;
    }
    if (category_id !== undefined) {
      updateData.category_id = category_id;
    }
    if (offer !== undefined) {
      updateData.offer = offer;
    }

    if (req.file?.path) {
      const previousPath = product.path;
      updateData.path = req.file.path;
      await product.update(updateData);

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

    await product.update(updateData);

    return res.status(200).json();
  }

  async index(_req, res) {
    const products = await Product.findAll({
      include: [
        {
          model: Category,
          as: 'category',
          attributes: ['id', 'name'],
        },
      ],
    });

    return res.json(products);
  }

  async delete(req, res) {
    const { admin: isAdmin } = await User.findByPk(req.userId);

    if (!isAdmin) {
      return res.status(401).json();
    }

    const { id } = req.params;

    const product = await Product.findByPk(id);

    if (!product) {
      return res.status(400).json({ error: 'Make sure your ID is correct' });
    }

    if (product.path) {
      if (isCloudinaryUrl(product.path)) {
        await deleteFromCloudinary(product.path);
      } else {
        const filePath = resolve(
          __dirname,
          '..',
          '..',
          '..',
          'uploads',
          product.path,
        );

        try {
          await unlink(filePath);
        } catch (_err) {
          // Se o arquivo não existir, continua com a exclusão
        }
      }
    }

    await Product.destroy({
      where: {
        id,
      },
    });

    return res.status(200).json();
  }
}

export default new ProductController();
