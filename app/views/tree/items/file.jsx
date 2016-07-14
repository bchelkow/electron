import React from 'react';

export default class FileItem extends React.Component {
  render() {
    const directory = [this.props.directory, this.props.path.join('/')].join('/');
    const type = this.props.type;
    
    
    return (
      <li>{this.props.name}</li>
    );
  }
}
