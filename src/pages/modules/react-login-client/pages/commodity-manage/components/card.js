import React, { Component } from 'react'
import { Card } from 'antd'
import {
    withRouter,
  } from "react-router-dom";
import { ArrowLeftOutlined } from '@ant-design/icons';


function CardTemp(props){

    const goBack = () => {
        props.history.go(-1)
    }

    const title = (
        <header onClick={goBack} style={{cursor:"pointer"}}>
            <ArrowLeftOutlined />
            <span>
                { props.title }
            </span>
        </header>
    )


    return (
        <>
        <Card title={title} extra={<a href="#">More</a>} style={{ width: '100%' }}>
            {
                props.children
            }
        </Card>
        </>
    )
}

export default withRouter(CardTemp)