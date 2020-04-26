import React, { Fragment, Component } from 'react';
import NotFound from '../components/not-found';
import Videos from './videos';
import Video from './video';
import Home from '../components/home';
import Contacto from '../components/contacto';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reducer from '../../reducers/index';
import { Map as map } from 'immutable';
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import Header from '../components/header';

// function logger({ getState, dispatch}) {
//   return (next) => {
//     return (action) => {
//       console.log('este es mi viejo estado', getState().toJS())
//       console.log('vamos a enviar está acción', action);
//       const value = next(action)
//       console.log('este es mi nuevo estado', getState().toJS())
//       return value
//     }
//   }
// }

const logger_ = ({ getState, dispatch }) => (next) => (action) => {
  console.log('este es mi viejo estado', getState().toJS());
  console.log('vamos a enviar está acción', action);
  const value = next(action);
  console.log('este es mi nuevo estado', getState().toJS());
  return value;
};

const store = createStore(
  reducer,
  map(),
  composeWithDevTools(applyMiddleware(logger, thunk))
);

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Fragment>
          <Header />
          <Switch>
            <Route exact path='/' component={Home} />
            <Route exact path='/videos' component={Videos} />
            <Route exact path='/contacto' component={Contacto} />
            <Route exact path='/videos/:id' component={Video} />
            <Redirect from='/v' to='/videos' />
            <Redirect from='/v/:id' to='/videos/:id' />
            <Route component={NotFound} />
          </Switch>
        </Fragment>
      </Provider>
    );
  }
}

export default App;

/*
  Este archivo  se renderizará desde el servidor
*/
