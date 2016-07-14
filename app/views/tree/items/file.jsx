import React from 'react';
import array from 'lodash/array';
import Directory from '../../../controllers/directory';

export default class FileItem extends React.Component {
  onFileClick() {
    Directory.Files.current = array.join([this.props.directory, array.join(this.props.path, '/')], '/');
  }
  
  render() {
    //const type = this.props.type;
    
    return (
      <li>
        <span onClick={this.onFileClick.bind(this)}>
          <i className="fa fa-fw fa-file"/>
          {this.props.name}
        </span>
      </li>
    );
  }
}
