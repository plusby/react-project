import React, { Suspense } from 'react'
// import Home from '@/pages/Home/home.js'
import routes from '@/router/index';
const Home = React.lazy(() => import('@/pages/modules/sum/sum-home.js'));
const ClientHome = React.lazy(() => import('@/pages/modules/react-login-client/pages/login/login.js'));
const Admin = React.lazy(() => import('@/pages/modules/react-login-client/pages/admin/admin.js')); 
import './reset.css'


import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    withRouter,
    Redirect,
  } from "react-router-dom";



function App(props){

    return  <Router>
              <>
                <Switch>
                  <Suspense fallback={<div>Loading</div>}>
                    <Route path='/home' component={Home}/>
                    <Route path='/ClientHome' component={ClientHome}/>
                    <Route path='/admin' component={Admin}/>
                    <Redirect to="/home" />
                  </Suspense>
                </Switch>
              </>
            </Router>
}

function RouteWithSubRoutes(...item) {
    console.log(item)
    if (!item.component ){
        return <></>
    }
    return (
        <Route
            path={item.path}
            render={props => {
                return (
                //   <Suspense fallback={<div>Loading</div>}><item.component {...props}></item.component></Suspense>
                 <div>88888</div>
                //  <item.component {...props}></item.component>
                );
            }}
        />
        );
}

export default App
