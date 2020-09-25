import React from 'react'
import CardTemp from './components/card'
import EditForm from './components/editForm'
import './index.less'

const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 10 },
};

function getBase64(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error);
    });
}

export default function Add(){

    const validateMessages = {
        required: '${label} is required!',
        types: {
          email: '${label} is not validate email!',
          number: '${label} is not a validate number!',
        },
        number: {
          range: '${label}  must be between ${min} and ${max}',
        },
    };

    const formConfig = [
        {
            name: 'name',
            label: '商品名称',
            required: true,
            type: 'Input',
            defaultVal: 888,
            disabled: true
        },
        {
            name: 'type',
            label: '类别',
            required: true,
            type: 'InputNumber',
            disabled: true
        },
        {
            name: 'num',
            label: '库存',
            required: true,
            type: 'InputNumber',
            disabled: true,
            rules: [{ type: 'number', min: 0, max: 99 }]
        },
        {
            name: 'address',
            label: '地址',
            required: true,
            type: 'Cascader',
            placeholder: '请选择地址',
            options: [{
                value: 'zhejiang',
                label: 'Zhejiang',
                children: [
                  {
                    value: 'hangzhou',
                    label: 'Hangzhou',
                  },
                ],
              }]
        },
        {
            name: 'desc',
            label: '描述',
            required: false,
            type: 'InputTextArea',
        },
        {
            name: 'img',
            label: '图片',
            required: false,
            type: 'Upload',
            previewVisible: true,
            action: '',
            limit: 8, // 限制上传多少张图片
        },
    ]

    const formItemChange = (item,val) => {
        console.log(item,val)
    }

    
    return (
        <div>
           <CardTemp title="商品列表" >
                <EditForm formItemChange={formItemChange} validateMessage={validateMessages} formConfig={formConfig} />
           </CardTemp>
        </div>
    )
}