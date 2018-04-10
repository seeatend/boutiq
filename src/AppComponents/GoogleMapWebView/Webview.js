/* eslint-disable prefer-template */

const s4 = () => Math.floor((1 + Math.random()) * 0x10000)
  .toString(16)
  .substring(1);

const guid = () => s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();

class PseudoPromise {
  res= null
  rej= null
  resolved(data) {
    return this.res && this.next.resolved(this.res(data));
  }
  rejected(error) {
    return this.rej && this.next.rejected(this.rej(error));
  }
  caught(error) {
    return this.ca && this.ca(error);
  }
  then(res, rej) {
    this.res = res;
    this.rej = rej;
    this.next = new PseudoPromise();
    return this.next;
  }
  catch(fn) {
    this.ca = fn;
  }
}

class Message {
  serialize = JSON.stringify
  deserialize = JSON.parse
  constructor(param) {
    this.body = param;
  }
  toString() {
    return this.serialize(this.body);
  }
  toPayload() {
    return this.deserialize(this.body);
  }
}

export const webview = {
  channels: {},
  handshake() {
    const m = new Message({
      header: 'system',
      type: 'handshake',
    }).toString();
    setTimeout(() => {
      this.postMessage(m);
    }, 100);
  },
  call(path, ...args) {
    const channel = guid();
    const message = new Message({
      header: 'call',
      channel,
      path,
      params: args
    }).toString();
    this.postMessage(message);
    this.channels[channel] = new PseudoPromise();
    return this.channels[channel];
  },
};
