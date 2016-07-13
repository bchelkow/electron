import React from 'react';
import Directory from '../../controllers/directory';

export default class Tree extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = {
      directory: Directory.current
    };
  }
  
  componentDidMount() {
    Directory.subscribe((directory) => {
      this.setState({
        directory: directory
      });
    });
  }

  componentWillUnmount() {
    Directory.unsubscribe();
  }

  render() {
    return (
      <ul>
        {this.state.directory}
        <li>qwe</li>
        <li>qwe</li>
        <li>asd</li>
        <li>zxc</li>
      </ul>
    );
  }
}
