import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Switch, Route } from 'react-router-dom';
import createBrowserHistory from 'history/createBrowserHistory';
import App from './components/App'
import Header from './components/Header';
import * as serviceWorker from './serviceWorker';
import './index.css'

ReactDOM.render(
<Router history={createBrowserHistory()}>
    <Switch>
        <Route exact path='/' render={()=><Header><App /></Header>}></Route>
        {/* <Route exact path='/product/:id' render={()=><Header><Quote /></Header>}></Route> */}
    </Switch>
</Router>,
document.getElementById('root'));

serviceWorker.unregister();
