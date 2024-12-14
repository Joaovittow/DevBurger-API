import * as Yup from 'yup';
import Product from '../models/Product';

class ProductController {
  async store(req, res) {
    const schema = Yup.object({
      name: Yup.string().required(),
      price: Yup.number().required(),
      category: Yup.string().required(),
    });

    try {
      schema.validateSync(req.body, { abortEarly: false });
    } catch (err) {
      return res.status(400).json({ error: err.errors });
    }

    const { filename: path } = req.file;
    const { name, price, category } = req.body;

    const product = await Product.create({
      name,
      price,
      category,
      path,
    });

    return res.status(201).json(product);
  }

  async index(req, res) {
    const products = await Product.findAll();

    return res.json(products);
  }
}

export default new ProductController();
