import { EventEmitter } from 'events';
import { ipcRenderer } from 'electron';

const DIRECTORY_CHANGE = 'directory-change';

class Directory {
  constructor() {
    this._directory = null;
    this._emitter = new EventEmitter();

    ipcRenderer.on(DIRECTORY_CHANGE, (event, data) => {
      this.current = data.directory;
    });
  }

  set current(directory) {
    this._directory = directory;
    this._emitter.emit(DIRECTORY_CHANGE, directory);
  }

  get current() {
    return this._directory;
  }

  subscribe(callback) {
    this._emitter.on(DIRECTORY_CHANGE, callback);
  }

  unsubscribe(callback) {
    this._emitter.removeListener(DIRECTORY_CHANGE, callback);
  }
}

export default new Directory();
