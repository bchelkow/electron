import { EventEmitter } from 'events';
import { ipcRenderer } from 'electron';
import _ from 'lodash';
import fs from 'fs-plus';

const DIRECTORY_CHANGE = 'directory-change';
const FILES_CHANGE = 'files-change';

class Files {
  constructor(directory = null) {
    this._files = {};
    this._directory = directory;
    this._emitter = new EventEmitter();
  }

  clear() {
    this._files = {};
  }

  setDirectory(directory) {
    this._directory = directory;
  }

  get directory() {
    return this._directory;
  }

  getFile(filePath) {
    return _.get(this._files, filePath);
  }

  _setFile(filePath, value) {
    _.set(this._files, filePath, value);
  }

  readFiles(inDirectory) {
    let directory = this._directory;

    if (inDirectory && inDirectory.length > 0) {
      directory = _.join([directory, _.join(inDirectory, '/')], '/');
    }

    _.each(fs.readdirSync(directory), (file) => {
      const isDirectory = fs.isDirectorySync(_.join([directory, file], '/'));
      let value = {};
      let filePath = [file];

      if (!isDirectory) {
        let split = _.split(file, '.');
        value = _.last(split);
      }

      if (inDirectory) {
        let split = _.clone(inDirectory);
        filePath = split.concat(filePath);
      }

      _.set(this._files, filePath, value);
    });
    this._emitter.emit(FILES_CHANGE);
  }

  _unsetFile(filePath) {
    _.unset(this._files, filePath);
    this._emitter._emit(FILES_CHANGE, filePath);
  }

  get all() {
    return this._files;
  }

  subscribe(callback) {
    this._emitter.on(FILES_CHANGE, callback);
  }

  unsubscribe(callback) {
    this._emitter.removeListener(FILES_CHANGE, callback);
  }
}

class Directory {
  constructor() {
    this._directory = null;
    this.Files = new Files();
    this._emitter = new EventEmitter();

    ipcRenderer.on(DIRECTORY_CHANGE, (event, data) => {
      this.current = data.directory;
    });
  }

  set current(directory) {
    if (directory !== this._directory) {
      this._directory = directory;
      this.Files.clear();
      this.Files.setDirectory(directory);
      this.Files.readFiles();
      this._emitter.emit(DIRECTORY_CHANGE, directory);
    }
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
