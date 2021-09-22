export class LockService {
  apiUrl = "wss://door-unlock-test.herokuapp.com";
  ws = {};
  connected = false;
  instance = null;

  static getInstance() {
    if (this.instance == null) this.instance = new LockService();
    return this.instance;
  }

  constructor() {
    var ws = new WebSocket("wss://door-unlock-test.herokuapp.com");
    ws.onopen = () => {
      this.connected = true;
    };
    this.ws = ws;
  }

  openLock = () => {
    if (this.connected) this.ws.send({ command: "open" });
  };

  closeLock = () => {
    if (this.connected) this.ws.send({ command: "close" });
  };
}
