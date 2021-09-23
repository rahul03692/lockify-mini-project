// export class LockService {
//   apiUrl = "wss://door-unlock-test.herokuapp.com";
//   ws = {};
//   connected = false;
//   data = null;

//   constructor() {
//     var ws = new WebSocket("wss://door-unlock-test.herokuapp.com");
//     ws.onopen = () => {
//       this.connected = true;
//     };
//     ws.onmessage = (msg) => {
//       message = JSON.parse(msg.data);
//       data = message.lockStatus;
//     };
//     this.ws = ws;
//   }

//   openLock = async () => {
//     if (this.connected) {
//       this.ws.send(JSON.stringify({ command: "open" }));
//     }
//   };

//   closeLock = async () => {
//     if (this.connected) this.ws.send(JSON.stringify({ command: "close" }));
//   };
// }
