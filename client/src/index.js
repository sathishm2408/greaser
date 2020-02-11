import React from 'react';
import ReactDOM from 'react-dom';
import "semantic-ui-css/semantic.min.css";
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';
import AdminHome from './components/AdminHome';
import AdminHeader from './components/Header';
import rootReducer from './reducers/main';
import Product from './components/Product';
import AddProduct from './components/AddProduct';
import ProductViews from './components/ProductViews';
import UpdateProduct from './components/UpdateProduct'
import * as serviceWorker from './serviceWorker';
import './index.css'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunkMiddleware)));

ReactDOM.render(
    <Provider store={store}>
        <Router>
            <Switch>
                <Route exact path='/admin' render={(props) => <AdminHeader props ={props}><AdminHome /></AdminHeader>}></Route>
                <Route exact path='/admin/product/:id' render={(props) => <AdminHeader props ={props}><Product props ={props} /></AdminHeader>}></Route>
                <Route exact path='/admin/AddProduct' render={(props) => <AdminHeader props ={props}><AddProduct /></AdminHeader>}></Route>
                <Route exact path='/admin/updateProduct' render={() => <AdminHeader><UpdateProduct /></AdminHeader>}></Route>
                <Route exact path='/admin/views' render={() => <AdminHeader><ProductViews /></AdminHeader>}></Route>
                
                {/* <Route exact path='/product/:id' render={()=><Header><Quote /></Header>}></Route> */}
            </Switch>
        </Router>
    </Provider>,
    document.getElementById('root'));

serviceWorker.unregister();
