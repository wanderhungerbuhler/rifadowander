import axios from 'axios'

const urls = [
  `${process.env.NEXT_PUBLIC_MERCADO_PAGO_URL}`,
  `${process.env.NEXT_PUBLIC_BASE_URL}`
];

export const api = urls.map((url) => axios.create({
  baseURL: url,
}));

api[0].interceptors.request.use(async config => {
  const token = process.env.NEXT_PUBLIC_MERCADOPAGO_TOKEN
  config.headers.Authorization = `Bearer ${token}`

  return config;
});
