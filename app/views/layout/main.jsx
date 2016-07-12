import React from 'react';

import Tree from '../tree/tree';

export default class Main extends React.Component {
  render() {
    return (
      <div className="row">
        <div className="col-xs-3">
          <Tree />
        </div>
        <div className="col-xs-9"></div>
      </div>
    );
  }
}
