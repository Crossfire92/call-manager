class RequestHelper {

  constructor() {
    this.serverurl = "http://localhost:8081";
  }

  getSettings() {
    return this.readJSONFromServer('settings');
  }

  readJSONFromServer(endpoint) {
    const request = new XMLHttpRequest();
    request.open('GET', `${this.serverurl}/${endpoint}`, false);
    request.send(null);

    if (request.status === 200) {
      return JSON.parse(request.responseText);
    } else {
      throw "Error during webcall";
    }
  }
}

export default RequestHelper;