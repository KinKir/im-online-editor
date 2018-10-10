import React, { Component } from 'react';
import { BrowserRouter, Switch} from 'react-router-dom';
import RouterView from './routes/RouterView';
import './assests/css/App.css';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <>
          <Switch>
            <RouterView />
          </Switch>
        </>
      </BrowserRouter>
    );
  }
}

export default App;
