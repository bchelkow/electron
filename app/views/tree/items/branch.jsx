import React from 'react';
import { _ } from 'lodash';
import FileItem from './file';
import Directory from '../../../controllers/directory';

export default class TreeBranch extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      hidden: true
    };
  }

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
    if (this.state.hidden) {
      Directory.Files.readFiles(path);
      this.setState({
        hidden: false
      });
    } else {
      Directory.Files.unsetPath(path);
      this.setState({
        hidden: true
      });
    }
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
    const className = this.state.hidden ? 'tree--hidden' : '';

    return (
      <li>
        <span onClick={this.onTreeBranchClick.bind(this, this.props.path)}>
          <i className="fa fa-fw fa-folder"/>
          {this.props.name}
        </span>
        <ul className={className}>
          {this.getTreeBranches()}
          {this.getFiles()}
        </ul>
      </li>
    );
  }
}