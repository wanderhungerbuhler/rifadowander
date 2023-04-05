import axios from 'axios'

const urls = [
  'https://api.mercadopago.com/',
  'http://localhost:3000/api'
];

export const api = urls.map((url) => axios.create({
  baseURL: url,
}));

api[0].interceptors.request.use(async config => {
  const token = process.env.NEXT_PUBLIC_MERCADOPAGO_TOKEN
  config.headers.Authorization = `Bearer ${token}`

  return config;
});
