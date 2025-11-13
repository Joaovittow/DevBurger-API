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
            if (!this.path) {
              return null;
            }

            return `${appConfig.url}/category-file/${this.path}`;
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
