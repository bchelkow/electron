import React from 'react';
import Directory from '../../../controllers/directory';

export default class DirectoryItem extends React.Component {
  render() {
    return (
      <li>
        <ul>Dir {this.props.name}
        </ul>
      </li>
    );
  }
}
