const defaultPort = process.env.PORT || 3001;

export default {
  url: process.env.APP_URL || `http://localhost:${defaultPort}`,
};

