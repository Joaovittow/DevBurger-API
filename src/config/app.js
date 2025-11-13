const { APP_URL, PORT = 3001 } = process.env;

const appConfig = {
  url: APP_URL || `http://localhost:${PORT}`,
};

export default appConfig;
