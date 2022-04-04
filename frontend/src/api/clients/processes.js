import APIClient from 'api/clients/base';

const paths = {
  PROCESS_LIST: 'processes',
  PROCESS_REFRESH: 'processes/refresh',
};

class ProcessAPIClient {
  constructor() {
    this.client = new APIClient();
  }

  getProcesses() {
    return this.client.get(paths.PROCESS_LIST);
  }

  refreshProcesses() {
    return this.client.get(paths.PROCESS_REFRESH);
  }
}

export default new ProcessAPIClient();
