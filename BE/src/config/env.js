require('dotenv').config();

module.exports = {
  PORT: process.env.PORT || 5000,
  MONGODB_URI: process.env.MONGODB_URI,
  API_PUBLIC_KEY: process.env.API_PUBLIC_KEY || 'caulongvui_public_key',
  API_SECRET_KEY: process.env.API_SECRET_KEY || 'caulongvui_secret_key',
  JWT_SECRET: process.env.JWT_SECRET || 'CauLongVuiSecretKey2026',
  JWT_REFRESH_SECRET: process.env.JWT_REFRESH_SECRET || 'CauLongVuiRefreshKey2026'
};
