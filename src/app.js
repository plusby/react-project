import React, { Suspense } from 'react'
// import Home from '@/pages/Home/home.js'
import routes from '@/router/index';
const Home = React.lazy(() => import('@/pages/modules/sum/sum-home.js'));
const ClientHome = React.lazy(() => import('@/pages/modules/react-login-client/pages/login/login.js'));
const Admin = React.lazy(() => import('@/pages/modules/react-login-client/pages/admin/admin.js')); 
import './reset.css'
import 'moment'


import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    withRouter,
    Redirect,
  } from "react-router-dom";

console.log('routes', routes)

function App(props){

    return  <Router>
              <>
                <Switch>
                  <Suspense fallback=''>
                    <Route path='/home' exact component={Home}/>
                    {/* <Route path='/ClientHome' component={ClientHome}/>
                    <Route path='/admin' component={Admin}/> */}
                    {
                      routes.map(item=>{
                        return <Route
                          key={item.path}
                          path={item.path}
                          render={props => {
                              return (
                                <item.component exact {...props}></item.component>
                              );
                          }}
                        />
                      })
                    }
                    <Redirect to="/home" />
                  </Suspense>
                </Switch>
              </>
            </Router>
}

function RouteWithSubRoutes(...item) {
    console.log(item)
    if (!item.component ){
        return null
    }
    return (
        <Route
            key={item.path}
            path={item.path}
            render={props => {
                return (
                  <item.component {...props}></item.component>
                );
            }}
        />
        );
}

export default App
