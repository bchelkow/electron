import React from 'react';

export default class FileItem extends React.Component {
  render() {
    return (
      <li>File {this.props.name}</li>
    );
  }
}
