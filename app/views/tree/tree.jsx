import React from 'react';

export default class Tree extends React.Component {
  render() {
    return (
      <div className="row">
        <div className="col-xs-12">
          <input type="file"/>
        </div>
        <div className="col-xs-12">
          <ul>
            <li>qwe</li>
            <li>asd</li>
            <li>zxc</li>
          </ul>
        </div>
      </div>
    );
  }
}
