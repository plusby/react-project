import React, { Suspense } from 'react'
// import Home from '@/pages/Home/home.js'
import routes from '@/router/index';
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
                <nav>
                    {/* {
                        routes.map((route, index) => {
                            const { show, title } = route.meta
                            // return  route.path !== '/' && show  ? <p key={index} onClick={()=>{goPage(route.path)}} >{title}</p> : ''
                            return  route.path !== '/' && show  ? <Link key={index} to={route.path} >{title}</Link> : ''
                        })
                    } */}
                    <Link  to='/sum' >{'title'}</Link>
                </nav>
                {/* <Switch> */}
                {
                    routes.map((route, index) => {
                        return  <RouteWithSubRoutes key={index} {...route} />
                    })
                }
                <Redirect to="/" />
                {/* </Switch> */}
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