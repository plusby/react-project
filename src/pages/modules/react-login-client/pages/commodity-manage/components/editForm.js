import React, { useState} from 'react'
import { Form, Input, InputNumber, Button, Upload, Modal, Cascader  } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

const { TextArea } = Input
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

export default function EditForm(props){

    // 预览图片弹框开关
    const [previewVisible, setPreviewVisible] = useState(false)
    // 要预览的图片
    const [previewImage, setPreviewImage] = useState('')
    // 预览图片的标题
    const [previewTitle, setPreviewTitle] = useState('')

    let fileList = [
      {
        uid: '-4',
        name: 'image.png',
        status: 'done',
        url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
      },
      {
        uid: '-xxx',
        percent: 50,
        name: 'image.png',
        status: 'uploading',
        url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
      },
      {
        uid: '-5',
        name: 'image.png',
        status: 'error',
      },
    ]

    const onFinish = values => {
        console.log(values);
    };

    // 关闭预览图片
    const handleCancel = () => setPreviewVisible(false);

    // 点击预览图片
    const handlePreview = async file => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj);
        }
        setPreviewImage(file.url || file.preview)
        setPreviewVisible(true)
        setPreviewTitle(file.name || file.url.substring(file.url.lastIndexOf('/') + 1))
    };

    const uploadButton = (
        <div>
          <PlusOutlined />
          <div style={{ marginTop: 8 }}>Upload</div>
        </div>
      );

    const handleChange = (item,value) => {
        if(item.type === 'Input' || item.type === 'InputTextArea' ){
            value = value.target.value
        }
        props.formItemChange && props.formItemChange(item,value)
    }

    const renderComp = (item) => {
        switch(item.type){
            case 'Input':
                return <Input disabled={item.disabled} placeholder={item.placeholder || ''}  onChange={(e)=>{handleChange(item,e)}}  />
                break
            case 'InputNumber':
                return <InputNumber disabled={item.disabled} placeholder={item.placeholder || ''} onChange={(e)=>{handleChange(item,e)}} value={item.defaultVal} />
                break
            case 'Cascader':
                return <Cascader disabled={item.disabled} options={item.options || []} onChange={(e)=>{handleChange(item,e)}}  placeholder={item.placeholder || ''} />
                break
            case 'InputTextArea':
                return <TextArea disabled={item.disabled}  placeholder={item.placeholder || ''} onChange={(e)=>{handleChange(item,e)}}  />
                break
            case 'Upload':
                return (
                    <>
                        <Upload
                            action={item.action || "https://www.mocky.io/v2/5cc8019d300000980a055e76"}
                            listType="picture-card"
                            fileList={fileList}
                            onPreview={handlePreview}
                            onChange={(e)=>{handleChange(item,e)}}
                            disabled={item.disabled}
                            >
                            {fileList.length >= item.limit ? null : uploadButton}
                        </Upload>
                        {
                            item.previewVisible && <Modal
                                                        visible={previewVisible}
                                                        title={previewTitle}
                                                        footer={null}
                                                        onCancel={handleCancel}
                                                    >
                                                        <img alt="example" style={{ width: '100%' }} src={previewImage} />
                                                    </Modal>
                        }
                    </>
                )
                break

        }
    }
    
    const { validateMessages, formConfig } = props
    return (
        <div>
            <Form {...layout} name="nest-messages" onFinish={onFinish} validateMessages={validateMessages}>
                {
                    formConfig && formConfig.map((item,index)=>{
                        return  <Form.Item key={index} label={item.label} initialValue={item.defaultVal} name={[item.name]}  rules={item.rules ? [{ required: item.required },...item.rules] :  [{ required: item.required }]}>
                                   {
                                       renderComp(item)
                                   } 
                                </Form.Item>
                    })
                }
                <Form.Item wrapperCol={{ offset: 8, span: 10 }}>
                    <Button style={{width:'100%'}} type="primary" htmlType="submit">
                        提交
                    </Button>
                </Form.Item>
            </Form>
        </div>
    )
}