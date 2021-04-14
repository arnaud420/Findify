const config = {
  // API_URL: 'https://findify-api.herokuapp.com',
  API_URL: process.env.REACT_APP_ENV === 'production' ? 'https://api-lgiw54iwnq-ew.a.run.app' : 'http://localhost:3003',
};

export default config;