module.exports = {
  url: process.env.DATABASE_URL,
  dialect: 'postgres',
  host: process.env.DB_HOST,
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  dialectOptions: {
    ssl: process.env.DATABASE_URL
      ? {
          require: true,
          rejectUnauthorized: false,
        }
      : false,
  },
  define: {
    timestamps: true,
    underscored: true,
    underscoredAll: true,
  },
};
