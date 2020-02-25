import React from 'react';
import { Suspense, lazy } from 'react';
import ReactDOM from 'react-dom';
import "semantic-ui-css/semantic.min.css";
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';
import AdminHome from './components/AdminHome';
import AdminHeader from './components/AdminHeader';
import rootReducer from './reducers/main';

import * as serviceWorker from './serviceWorker';
import './index.css'

const Product= lazy(()=> import('./components/Product'));
const ProductViews =lazy(()=> import('./components/ProductViews'));
const UpdateProduct= lazy(()=> import('./components/UpdateProduct'));
const AddProduct = lazy(() => import('./components/AddProduct'));

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunkMiddleware)));

ReactDOM.render(
    <Provider store={store}>
        <Router>
            <Suspense fallback={<h1>Loading...</h1>}>
                <Switch>
                    <Route exact path='/admin' render={() => <AdminHeader><AdminHome /></AdminHeader>}></Route>
                    <Route exact path='/admin/product/:id' render={() => <AdminHeader><Product /></AdminHeader>}></Route>
                    <Route exact path='/admin/AddProduct' render={() => <AdminHeader><AddProduct /></AdminHeader>}></Route>
                    <Route exact path='/admin/updateProduct' render={() => <AdminHeader><UpdateProduct /></AdminHeader>}></Route>
                    <Route exact path='/admin/views' render={() => <AdminHeader><ProductViews /></AdminHeader>}></Route>

                </Switch>
            </Suspense>
        </Router>
    </Provider>,
    document.getElementById('root'));

serviceWorker.unregister();
