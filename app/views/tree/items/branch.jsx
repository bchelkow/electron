import React from 'react';
import { _ } from 'lodash';
import FileItem from './file';
import Directory from '../../../controllers/directory';

export default class TreeBranch extends React.Component {
  getTreeBranches() {
    const directories = _.pickBy(this.props.files, _.isObject);

    return _.map(directories, (directory, key) => {
      let path = _.clone(this.props.path);
      path.push(key);

      return (
        <TreeBranch key={_.join(path, '/')} name={key} path={path} directory={this.props.directory}
                    files={this.props.files[key]}/>
      );
    });
  }

  onTreeBranchClick(path) {
    Directory.Files.readFiles(path);
  }

  getFiles() {
    const files = _.pickBy(this.props.files, _.isString);

    return _.map(files, (file, key) => {
      let path = _.clone(this.props.path);
      path.push(key);

      return (
        <FileItem key={_.join(path, '/')} name={key} path={path} directory={this.props.directory} type={file}/>
      );
    });
  }

  render() {
    return (
      <li>
        <ul><a onClick={this.onTreeBranchClick.bind(this, this.props.path)}>{this.props.name}</a>
          {this.getTreeBranches()}
          {this.getFiles()}
        </ul>
      </li>
    );
  }
}