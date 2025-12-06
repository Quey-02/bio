import Axios from 'axios';

const baseURI = process.env.NEXT_PUBLIC_BACKEND_URL ?? 'http://localhost:8000';

const axios = Axios.create({
  baseURL: baseURI,
  headers: {
    // 'X-Requested-With': 'XMLHttpRequest',
  },
  withXSRFToken: true,
});

export default axios;
