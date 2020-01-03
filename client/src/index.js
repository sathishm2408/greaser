import React from 'react';
import ReactDOM from 'react-dom';
import "semantic-ui-css/semantic.min.css";
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';
import Home from './components/Home'
import Header from './components/Header';
import rootReducer from './reducers/main';
import Product from './components/Product'
import UpdateProduct from './components/UpdateProduct'
import * as serviceWorker from './serviceWorker';
import './index.css'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunkMiddleware)));

ReactDOM.render(
    <Provider store={store}>
        <Router>
            <Switch>
                <Route exact path='/' render={() => <Header><Home /></Header>}></Route>
                <Route exact path='/product' render={() => <Header><Product /></Header>}></Route>
                <Route exact path='/updateProduct' render={() => <Header><UpdateProduct /></Header>}></Route>
                {/* <Route exact path='/product/:id' render={()=><Header><Quote /></Header>}></Route> */}
            </Switch>
        </Router>
    </Provider>,
    document.getElementById('root'));

serviceWorker.unregister();
