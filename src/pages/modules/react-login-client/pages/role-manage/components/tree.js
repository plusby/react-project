import React, { useState, useEffect } from 'react'
import { getStore } from '@/common/utils'
import { Tree } from 'antd'

export default function TreeTemp(props){
    console.log('props',props)
    const [treeData, setTreeData] = useState()
    const [expandedKeys, setExpandedKeys] = useState([]);
    const [checkedKeys, setCheckedKeys] = useState([...props.defaultSelectedKeys]);
    const routes = getStore('routeMsg')

    const initTreeData = (obj) => {
        return obj.map(item=>{
            if(item.children){
                return {
                    title: item.title,
                    key: item.title,
                    children: initTreeData(item.children)
                  }
            }else{
                return {
                    title: item.title,
                    key: item.page,
                  }
            }
        })
    }

    
    const onCheck = (checkedKeys) => {
        console.log('onCheck', checkedKeys);
        setCheckedKeys(checkedKeys);
        props.treeCheckedKeysCb &&  props.treeCheckedKeysCb(checkedKeys)
    };

    useEffect(()=>{
        console.log('initTreeData(routes)',initTreeData(routes))
        setTreeData(initTreeData(routes))
    },[])
    
    return (
        <div>
           { treeData &&
            <Tree
                checkable
                defaultExpandAll
                onCheck={onCheck}
                checkedKeys={checkedKeys}
                treeData={treeData}
                height={600}
            /> }
        </div>
    )
}