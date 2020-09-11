import React, { Suspense } from 'react'
import routes from '@/router/index';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
  } from "react-router-dom";


export default function App(props){
    
    function goPage(page){
        console.log(props)
        props.history.push(page)
    }
    
    return  <>
                <nav>
                    {
                        routes.map((route, index) => {
                            
                            const { show, title } = route.meta
                        return  route.path !== '/' && show  ? <p key={index} onClick={()=>{goPage(route.path)}} >{title}</p> : ''
                        })
                    }
                </nav>
                {
                    routes.map((route, index) => {
                        console.log(route,route.path !== '/')
                        return  <RouteWithSubRoutes key={index} {...route} />
                    })
                }
            </>
}

function RouteWithSubRoutes(...item) {
    console.log(item)
    if (item.path && item.path !== '/') {
        return (
            <Route
              path={item.path}
              render={props => {
                return (
                  <Suspense fallback={<div>Loading</div>}><item.component {...props}></item.component></Suspense>
                );
              }}
            />
          );
    }else {
        return <></>
    }
    
}