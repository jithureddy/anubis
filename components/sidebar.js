import React, { Component, PropTypes } from 'react';
import Loading from 'halogen/ClipLoader';
import Guardian from './guardian';
import Card from './card';

/**
 * Default sidebar.
 *
 * @constructor
 * @public
 */
export default class Sidebar extends Component {
  render() {
    return (
      <div className="box thirty sidebar">
        <div className="details">
          <Guardian />
        </div>

        <div className="trials-card">
          <Card>
            <Loading color='#51535e' />
          </Card>
        </div>
      </div>
    );
  }
};