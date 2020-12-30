import React, { Component } from 'react';
import { Route } from 'react-router';
import { Layout } from './components/Layout';
import { ShipmentsList } from './components/ShipmentsList';
import { AddShipment } from './components/AddShipment';

import './custom.css'
import { GetLetterBagList } from './components/GetLetterBagList';

export default class App extends Component {
  static displayName = App.name;

  render () {
    return (
      <Layout>
        <Route exact path='/' component={ShipmentsList} />
        <Route path='/add-shipment' component={AddShipment} />
        {/* <Route path='/get-bags-list' component={GetLetterBagList}/> */}
      </Layout>
    );
  }
}
