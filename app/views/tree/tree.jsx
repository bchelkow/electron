import React from 'react';
import { _ } from 'lodash';
import Random from '../../helpers/random';
import Directory from '../../controllers/directory';
import FileItem from './items/file';
import DirectoryItem from './items/directory';

export default class Tree extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      directory: Directory.current,
      files    : Directory.Files.all
    };
  }

  componentDidMount() {
    Directory.subscribe((directory) => {
      this.setState({
        directory: directory
      });
    });
    Directory.Files.subscribe(() => {
      this.setState({
        files: Directory.Files.all
      });
    });
  }

  componentWillUnmount() {
    Directory.unsubscribe();
    Directory.Files.unsubscribe();
  }

  getDirectories() {
    const directories = _.pickBy(this.state.files, _.isObject);
    
    return _.map(directories, (directory, key) => {
      return <DirectoryItem key={Random.id()} name={key} />
    });
  }

  getFiles() {
    const files = _.pickBy(this.state.files, _.isString);

    return _.map(files, (directory, key) => {
      return <FileItem key={Random.id()} name={key} />
    });
  }

  render() {
    return (
      <ul>
        {this.getDirectories()}
        {this.getFiles()}
      </ul>
    );
  }
}
