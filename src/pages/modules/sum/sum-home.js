import React, { Component } from 'react'
import {
    Link,
  } from "react-router-dom";

export default class SumHome extends Component {

    render() {
        return (
            <div>
               <nav>
                    <Link  to='/home' >{'title'}</Link>
                    <Link  to='/clientHome' >管理系统</Link>
                </nav>
            </div>
        )
    }
}
