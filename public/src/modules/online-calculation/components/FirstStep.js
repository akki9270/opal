import React, { useState, useEffect } from 'react';
import { Button, Modal, Form, Select, Row, Col } from 'antd';
import { MATERIALS } from "../constants";

const { Option } = Select;

const { confirm } = Modal

const FirstStep = (props) => {
  const [form] = Form.useForm();
  const [lense, setLense] = useState();
  // const [lenseType, setLenseType] = useState();
  // const [lenseDesign, setLenseDesign] = useState();
  // const [canalLength, setCanalLength] = useState();
  // const [material, setMaterial] = useState();

  useEffect(() => {
    if (props.firstStepData.lense) {
      setLense((props.firstStepData.lense))
    }
  }, [props.firstStepData]);

  const handleLenseChange = (value) => {
    // if (lense === 'PROGRESSIVE' && value !== 'PROGRESSIVE') {     
    //   confirm({
    //     title: 'Are you sure, you want to change this lense?',        
    //     okText: 'ok',
    //     okType: 'primary',
    //     onOk: () => {
    //       setLense(value);
    //     },
    //   })
    // } else {    
    //   setLense(value);
    // }
    setLense(value);
  };

  const onFinish = (values) => {
    props.onSaveFirstStepData(values);
  };

  const isProgressiveLense = lense === 'PROGRESSIVE'  
  return (
    <div className='p-5'>
      <Form
        form={form}
        layout='vertical'
        name='lense-details'
        initialValues={{ ...props.firstStepData }}
        onFinish={onFinish}
      >
        <Row justify='center'>
          <Col span={6} >
            <Form.Item
              label='Lense'
              name='lense'              
              rules={[
                {
                  required: true,
                  message: 'Please select lense!',
                }
              ]}
            >
              <Select
                showSearch
                allowClear
                placeholder='Select Lense'
                onSelect={handleLenseChange}                                
                value={lense}
              >
                <Option value='PROGRESSIVE'>Progressive</Option>
                <Option value='SINGLE_VISION'>Single Vision</Option>
                <Option value='ASPHERIC'>Aspheric</Option>
              </Select>
            </Form.Item>
            <Form.Item
              label='Type'
              name='lenseType'
              rules={[
                {
                  required: true,
                  message: 'Please select lense Type!',
                }
              ]}
            >
              <Select
                showSearch
                allowClear
                placeholder='Select Lense L/R'
              >
                <Option value='BOTH'>Both</Option>
                <Option value='LEFT'>Left</Option>
                <Option value='RIGHT'>Right</Option>
              </Select>
            </Form.Item>
            {isProgressiveLense && <Form.Item
              label='Design'
              name='lenseDesign'
              rules={[
                {
                  required: true,
                  message: 'Please select design!',
                }
              ]}
            >
              <Select
                showSearch
                allowClear
                // value={lenseDesign}
                placeholder='Select Lense Design'
              >
                <Option value='STANDARD'>Standard</Option>
                <Option value='AUTO'>Auto</Option>
                <Option value='OFFICE'>Office</Option>
              </Select>
            </Form.Item>}
            {isProgressiveLense && <Form.Item
              label='Canal Length'
              name='canalLength'
              rules={[
                {
                  required: true,
                  message: 'Please select canal length!',
                }
              ]}
            >
              <Select
                showSearch
                allowClear
                // value={canalLength}
                placeholder='Select Canal Length '
              >
                <Option value={9}>9</Option>
                <Option value={11}>11</Option>
                <Option value={13}>13</Option>
              </Select>
            </Form.Item>}
            {isProgressiveLense && <Form.Item
              label='Material'
              name='material'
              rules={[
                {
                  required: true,
                  message: 'Please select material!',
                }
              ]}
            >
              <Select
                showSearch
                allowClear
                // value={material}
                placeholder='Select Material'
              >
                {MATERIALS.map((matObj) => {
                  return <Option key={matObj.key} value={matObj.key}>{matObj.value}</Option>
                })}
              </Select>
            </Form.Item>}
          </Col>
        </Row>
        <Row>
          <div className='mt-5'>
            <Button type='primary' htmlType='submit'>
              Next
            </Button>
          </div>
        </Row>
      </Form>
    </div>
  )
}

export default FirstStep