import axios from 'axios';

class APIClient {
  /**
   * Axios wrapper client:
   */
  constructor() {
    this.client = axios.create({
      baseURL: process.env.REACT_APP_DJANGO_API_BASE,
    });
  }

  get(...args) {
    return this.client.get(...args);
  }

  post(...args) {
    return this.client.post(...args);
  }

  options(...args) {
    return this.client.options(...args);
  }

  put(...args) {
    return this.client.put(...args);
  }

  patch(...args) {
    return this.client.patch(...args);
  }

  delete(...args) {
    return this.client.delete(...args);
  }
}

export default APIClient;
