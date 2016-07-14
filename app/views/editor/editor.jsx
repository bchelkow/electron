import React from 'react';
import fs from 'fs';
import codeMirror from 'codemirror';
import Directory from '../../controllers/directory';

export default class Editor extends React.Component {
  componentDidMount() {
    this.codeMirror = codeMirror(document.getElementById('code-mirror'), {
      readOnly: true,
      lineNumbers: true
    });
    Directory.Files.subscribeCurrent((file) => {
      if (file) {
        fs.readFile(file, 'utf8', (err, data) => {
          if (err) throw err;
          this.codeMirror.setValue(data);
        });
      }
    });
  }

  componentWillUnmount() {
    Directory.Files.unsubscribeCurrent();
  }

  render() {
    return (
      <div id="code-mirror"></div>
    );
  }
}
