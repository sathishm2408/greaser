import React, { Component } from 'react';
import { Suspense, lazy } from 'react';
import { Switch, Route, withRouter } from 'react-router-dom';
import './index.css'

import AdminHome from './components/admin/AdminHome';
import AdminHeader from './components/admin/AdminHeader';

import Header from './components/user/Header/Header';
import Signin from './components/user/Signin/Signin';
import Signup from './components/user/Signup/Signup';

const Product = lazy(() => import('./components/admin/Product'));
const ProductViews = lazy(() => import('./components/admin/ProductViews'));
const UpdateProduct = lazy(() => import('./components/admin/UpdateProduct'));
const AddProduct = lazy(() => import('./components/admin/AddProduct'));



class App extends Component{
    render(){
        console.log("hhhhhh",(this.props.location.pathname).slice(0,7));
        
        return(
            <div>
                <Suspense fallback={<h1>Loading...</h1>}>
                {((this.props.location.pathname).slice(0,6) === "/admin" || (this.props.location.pathname).slice(0,7) === "/signin")? null : <Header />}
                <Switch>
  
                    <Route exact path='/admin' render={() => <AdminHeader><AdminHome /></AdminHeader>}></Route>
                    <Route exact path='/admin/product/:id' render={() => <AdminHeader><Product /></AdminHeader>}></Route>
                    <Route exact path='/admin/AddProduct' render={() => <AdminHeader><AddProduct /></AdminHeader>}></Route>
                    <Route exact path='/admin/updateProduct/:id' render={() => <AdminHeader><UpdateProduct /></AdminHeader>}></Route>
                    <Route exact path='/admin/views' render={() => <AdminHeader><ProductViews /></AdminHeader>}></Route>

                    <Route exact path='/'> <Header /> </Route>
                    <Route exact path="/signin" > <Signin /> </Route>
                    <Route exact path="/signup" > <Signup /> </Route>
                </Switch>
            </Suspense>
            </div>
        )
    }
}

export default withRouter(App);
