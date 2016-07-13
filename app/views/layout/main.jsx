import React from 'react';

import Directory from '../../controllers/directory';
import Tree from '../tree/tree';

export default class Main extends React.Component {
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
      <div>
        <div className="row">
          <div className="col-xs-12">
            <h2>{this.state.directory}</h2>
          </div>
        </div>
        <div className="row">
          <div className="col-xs-3">
            <Tree />
          </div>
          <div className="col-xs-9"></div>
        </div>
      </div>
    );
  }
}
