import React from 'react';
import { _ } from 'lodash';
import Directory from '../../controllers/directory';
import TreeBranch from './items/branch';

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

  render() {
    return (
      <ul>
        <TreeBranch name={_.last(_.split(this.state.directory, '/'))} path={[]} directory={this.state.directory}
                    files={this.state.files}/>
      </ul>
    );
  }
}
