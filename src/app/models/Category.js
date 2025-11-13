import Sequelize, { Model } from 'sequelize';
import appConfig from '../../config/app';

class Category extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        path: Sequelize.STRING,
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

            return `${appConfig.url}/category-file/${path}`;
          },
        },
      },
      {
        sequelize,
      },
    );

    return this;
  }
}

export default Category;
