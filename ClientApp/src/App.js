import React, { Component } from 'react';
import { Route } from 'react-router';
import { Layout } from './components/Layout';
import { ShipmentsList } from './components/ShipmentsList';
import { AddShipment } from './components/AddShipment';
import { GetBagList } from './components/GetBagList';
import { GetParcelsList } from "./components/GetParcelsList";
import './custom.css'


export default class App extends Component {
  static displayName = App.name;

  render () {
    return (
      <Layout>
        <Route exact path='/' component={ShipmentsList} />
        <Route path='/add-shipment' component={AddShipment} />
        <Route path='/bags-list' component={GetBagList}/>
        <Route path='/parcels-list' component={GetParcelsList}/>
      </Layout>
    );
  }
}
