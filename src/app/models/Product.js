import Sequelize, { Model } from 'sequelize';
import appConfig from '../../config/app';

class Product extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        price: Sequelize.INTEGER,
        path: Sequelize.STRING,
        offer: Sequelize.BOOLEAN,
        url: {
          type: Sequelize.VIRTUAL,
          get() {
            const { path } = this;
            if (!path) {
              return null;
            }

            if (path.startsWith('http')) {
              return path;
            }

            return `${appConfig.url}/product-file/${path}`;
          },
        },
      },
      {
        sequelize,
      },
    );

    return this;
  }

  static associate(models) {
    this.belongsTo(models.Category, {
      foreignKey: 'category_id',
      as: 'category',
    });
  }
}

export default Product;
