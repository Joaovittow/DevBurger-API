import * as Yup from 'yup';
import Order from '../schemas/Order';
import Product from '../models/Product';
import Category from '../models/Category';
import User from '../models/User';

class OrderController {
  async store(req, res) {
    const schema = Yup.object({
      products: Yup.array()
        .required()
        .of(
          Yup.object({
            id: Yup.number().required(),
            quantity: Yup.number().required().min(1),
          })
        ),
    });

    try {
      await schema.validate(req.body, { abortEarly: false });
    } catch (err) {
      return res.status(400).json({ error: err.errors });
    }

    try {
      const { products } = req.body;
      const productsIds = products.map((product) => product.id);

      // Busca os produtos com suas categorias
      const findProducts = await Product.findAll({
        where: { id: productsIds },
        include: [
          {
            model: Category,
            as: 'category',
            attributes: ['name'],
          },
        ],
      });

      // Verifica se todos os produtos foram encontrados
      if (findProducts.length !== products.length) {
        const foundIds = findProducts.map((p) => p.id);
        const missingIds = productsIds.filter((id) => !foundIds.includes(id));
        return res.status(404).json({
          error: `Produtos não encontrados: ${missingIds.join(', ')}`,
        });
      }

      // Formata os produtos para o pedido
      const formattedProducts = findProducts.map((product) => {
        const productItem = products.find((item) => item.id === product.id);

        return {
          id: product.id,
          name: product.name,
          category: product.category.name, // Corrigido para "category" (minúsculo)
          price: product.price,
          url: product.url,
          quantity: productItem.quantity,
        };
      });

      // Cria o pedido
      const order = {
        user: {
          id: req.userId,
          name: req.userName,
        },
        products: formattedProducts,
        status: 'Pedido Realizado',
      };

      const createdOrder = await Order.create(order);
      return res.status(201).json(createdOrder);
    } catch (error) {
      console.error('Error creating order:', error);
      return res.status(500).json({ error: 'Erro ao criar pedido' });
    }
  }
  async index(req, res) {
    const orders = await Order.find();

    return res.json(orders);
  }

  async update(req, res) {
    const schema = Yup.object({
      status: Yup.string().required(),
    });

    try {
      await schema.validate(req.body, { abortEarly: false });
    } catch (err) {
      return res.status(400).json({ error: err.errors });
    }

    const { admin: isAdmin } = await User.findByPk(req.userId);

    if (!isAdmin) {
      return res.status(401).json();
    }

    const { id } = req.params;
    const { status } = req.body;

    try {
      await Order.updateOne({ _id: id }, { status });
    } catch (err) {
      return res.status(400).json({ error: err.message });
    }

    return res.json({ message: 'Status updated successfully' });
  }
}

export default new OrderController();
