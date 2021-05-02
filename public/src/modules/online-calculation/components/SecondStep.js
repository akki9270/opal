import React, { useState } from 'react';
import { Button, Modal, Form, Slider, Input, Row, Col, Typography, Tooltip } from 'antd';
import { InfoCircleOutlined } from '@ant-design/icons';
import { isEqual, includes } from 'lodash';
import { useSelector } from 'react-redux';
import { formValidatorRules } from '../../../common/utility'
import { showNotification } from '../../../helpers';

const { Title } = Typography;
const { confirm } = Modal;

const { number, decimalNumber } = formValidatorRules;

const SecondStep = (props) => {
  const [form] = Form.useForm();
  const firstStepData = useSelector(state => state.calculation.firstStep);  
  const isLeftLense = firstStepData.lenseType === 'LEFT';
  const isRightLense = firstStepData.lenseType === 'RIGHT';
  const isBothLense = firstStepData.lenseType === 'BOTH';
  let defaultSecondStepData = {
    'rightPrvm': 0,
    'rightPrva': 0,
    'rightCyl': 0,
    'leftPrvm': 0,
    'leftPrva': 0,
    'leftCyl': 0,
  };
  const isValidData = async(formData) => {
    const { rightSph, leftSph, rightAdd, leftAdd, leftCyl, rightCyl } = formData;
    const isLeftSphZero = parseFloat(leftSph) === 0;
    const isRightSphZero = parseFloat(rightSph) === 0;
    const isLeftAddZero = parseFloat(leftAdd) === 0;
    const isRightAddZero = parseFloat(rightAdd) === 0;
    const isLeftCylZero = parseFloat(leftCyl) === 0;
    const isRightCylZero = parseFloat(rightCyl) === 0;   
    let isValid = true;
    if ((!isLeftSphZero && isLeftAddZero) || (isLeftSphZero && isLeftCylZero)) {
      if (isBothLense || isLeftLense) {
        showNotification('warn', 'Left lense is not a progressive lense');
        isValid = false;
      }
    }
    if ((!isRightSphZero && isRightAddZero) || (isRightSphZero && isRightCylZero)) {
      if (isBothLense || isRightLense) {
        showNotification('warn', 'Right lense is not a progressive lense');
        isValid = false;
      }
    }
    return isValid;
  }

  const onFinish = async(values) => {
    if (values) {
      // console.log('Values: ', values)
      const isValidFormData = await isValidData(values)
      if (isValidFormData) {
        if (firstStepData.lenseType === 'BOTH' && !isEqual(values.leftAdd, values.rightAdd)) {
          confirm({
            title: 'Are you sure you want to continue?',
            content: 'Add values are differ in both lense',
            okText: 'ok',
            okType: 'primary',
            onOk: () => {
              props.onSaveSecondStepData(values);
            },
          })
        } else {
          props.onSaveSecondStepData(values);
        }
      }
    }
  }
  
  if (isLeftLense) {
    defaultSecondStepData = {
      'leftPrvm': 0,
      'leftPrva': 0,
      'leftCyl': 0,
    }
  }
  if (isRightLense) {
    defaultSecondStepData = {
      'rightPrvm': 0,
      'rightPrva': 0,
      'rightCyl': 0,
    }
  }
  if (isBothLense) {
    defaultSecondStepData = {
      'rightPrvm': 0,
      'rightPrva': 0,
      'rightCyl': 0,
      'leftPrvm': 0,
      'leftPrva': 0,
      'leftCyl': 0,
    }
  }

  const suffixPlaceHolder = (title) => {
    return <Tooltip title={title}>
      <InfoCircleOutlined style={{ color: 'rgba(0,0,0,.45)' }} />
    </Tooltip>
  }

  return (
    <div className='p-5'>
      <Form
        form={form}
        layout='vertical'
        name='left-right-lense-details'
        initialValues={{ ...defaultSecondStepData, ...props.secondStepData }}
        onFinish={onFinish}
      >
        <Row justify='center'>
          {(isBothLense || isRightLense) && <Col className='p-1'>
            <div className='text-center'>
              <Title level={3}>Right Lense</Title>
            </div>
            <table className='table table-bordered table-hover table-striped'>
              <thead className='thead-light'>
                <tr>
                  <th scope='col'>SPH</th>
                  <th scope='col'>CYL</th>
                  <th scope='col'>AX</th>
                  <th scope='col'>PRVM</th>
                  <th scope='col'>PRVA</th>
                  {firstStepData.lense === 'PROGRESSIVE' && <th scope='col'>ADD</th>}
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td style={{ width: '20%' }}>
                    <Form.Item
                      name='rightSph'
                      rules={[
                        {
                          required: true,
                          message: 'Please input sph',
                        },
                        decimalNumber(-8, 8),
                        () => ({
                          validator(rule, value) {
                            if (value % 0.25 !== 0) {
                              return Promise.reject('should be in a step of 0.25 within -8 to 8');
                            }
                            return Promise.resolve();
                          },
                        }),
                      ]}
                    >
                      <Input
                        type='number'
                        placeholder='SPH'
                        step='0.25'
                        suffix={suffixPlaceHolder('0.25 steps')}
                      />
                    </Form.Item>
                  </td>
                  <td style={{ width: '15%' }}>
                    <Form.Item
                      name='rightCyl'
                      rules={[
                        {
                          required: true,
                          message: 'Please input cyl',
                        },
                        decimalNumber(0, 4),
                        () => ({
                          validator(rule, value) {
                            if (value % 0.25 !== 0) {
                              return Promise.reject('should be in a step of 0.25 within 0 to 4');
                            }
                            return Promise.resolve();
                          },
                        }),
                      ]}
                    >
                      <Input
                        type='number'
                        placeholder='CYL'
                        step='0.25'
                        suffix={suffixPlaceHolder('0.25 steps')}
                      />
                    </Form.Item>
                  </td>
                  <td style={{ width: '15%' }}>
                    <Form.Item
                      name='rightAx'
                      rules={[
                        {
                          required: true,
                          message: 'Please input ax',
                        },
                        number(0, 360),
                      ]}
                    >
                      <Input
                        type='number'
                        placeholder='AX'
                        step='1'
                      />
                    </Form.Item>
                  </td>
                  <td style={{ width: '15%' }}>
                    <Form.Item
                      name='rightPrvm'
                      rules={[
                        {
                          required: true,
                          message: 'Please input prvm',
                        },
                        decimalNumber(0, 5),
                      ]}
                    >
                      <Input
                        type='number'
                        placeholder='PRVM'
                        step='1'
                      />
                    </Form.Item>
                  </td>
                  <td style={{ width: '20%' }}>
                    <Form.Item
                      name='rightPrva'
                      rules={[
                        {
                          required: true,
                          message: 'Please input prva',
                        },
                        number(0, 360),
                      ]}
                    >
                      <Input
                        type='number'
                        placeholder='PRVA'
                        step='1'
                      />
                    </Form.Item>
                  </td>
                  {firstStepData.lense === 'PROGRESSIVE' && <td style={{ width: '15%' }}>                    
                    <Form.Item
                      name='rightAdd'
                      rules={[
                        {
                          required: true,
                          message: 'Please input add',
                        },
                        () => ({
                          validator(rule, value) {
                            if (value % 0.25 !== 0) {
                              return Promise.reject('should be in a step of 0.25');
                            }
                            return Promise.resolve();
                          },
                        }),
                      ]}
                    >                      
                      <Input
                        type='number'
                        placeholder='Add'
                        step='0.25'
                        suffix={suffixPlaceHolder('0.25 steps')}
                      />
                    </Form.Item>                    
                  </td>}
                </tr>
              </tbody>
            </table>
          </Col>}
          {(isBothLense || isLeftLense) && <Col className='p-1'>
            <div className='text-center'>
              <Title level={3}>Left Lense</Title>
            </div>
            <table className='table table-bordered table-hover table-striped'>
              <thead className='thead-light'>
                <tr>
                  <th scope='col'>SPH</th>
                  <th scope='col'>CYL</th>
                  <th scope='col'>AX</th>
                  <th scope='col'>PRVM</th>
                  <th scope='col'>PRVA</th>
                  {firstStepData.lense === 'PROGRESSIVE' && <th scope='col'>ADD</th>}
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td style={{ width: '20%' }}>
                    <Form.Item
                      name='leftSph'
                      rules={[
                        {
                          required: true,
                          message: 'Please input sph',
                        },
                        decimalNumber(-8, 8),
                        () => ({
                          validator(rule, value) {
                            if (value % 0.25 !== 0) {
                              return Promise.reject('should be in a step of 0.25 within -8 to 8');
                            }
                            return Promise.resolve();
                          },
                        }),
                      ]}
                    >
                      <Input
                        type='number'
                        placeholder='SPH'
                        step='0.25'
                        suffix={suffixPlaceHolder('0.25 steps')}
                      />
                    </Form.Item>
                  </td>
                  <td style={{ width: '15%' }}>
                    <Form.Item
                      name='leftCyl'
                      rules={[
                        {
                          required: true,
                          message: 'Please input cyl',
                        },
                        decimalNumber(0, 4),
                        () => ({
                          validator(rule, value) {
                            if (value % 0.25 !== 0) {
                              return Promise.reject('should be in a step of 0.25 within 0 to 4');
                            }
                            return Promise.resolve();
                          },
                        }),
                      ]}
                    >
                      <Input
                        type='number'
                        placeholder='CYL'
                        step='0.25'
                        suffix={suffixPlaceHolder('0.25 steps')}
                      />
                    </Form.Item>
                  </td>
                  <td style={{ width: '15%' }}>
                    <Form.Item
                      name='leftAx'
                      rules={[
                        {
                          required: true,
                          message: 'Please input ax',
                        },
                        number(0, 360),
                      ]}
                    >
                      <Input
                        type='number'
                        placeholder='AX'
                      />
                    </Form.Item>
                  </td>
                  <td style={{ width: '15%' }}>
                    <Form.Item
                      name='leftPrvm'
                      rules={[
                        {
                          required: true,
                          message: 'Please input prvm',
                        },
                        decimalNumber(0, 5),
                      ]}
                    >
                      <Input
                        type='number'
                        placeholder='PRVM'
                      />
                    </Form.Item>
                  </td>
                  <td style={{ width: '20%' }}>
                    <Form.Item
                      name='leftPrva'
                      rules={[
                        {
                          required: true,
                          message: 'Please input prva',
                        },
                        number(0, 360),
                      ]}
                    >
                      <Input
                        type='number'
                        placeholder='PRVA'
                      />
                    </Form.Item>
                  </td>
                  {firstStepData.lense === 'PROGRESSIVE' && <td style={{ width: '15%' }}>                    
                    <Form.Item
                      name='leftAdd'
                      rules={[
                        {
                          required: true,
                          message: 'Please input add',
                        },
                        () => ({
                          validator(rule, value) {
                            if (value % 0.25 !== 0) {
                              return Promise.reject('should be in a step of 0.25');
                            }
                            return Promise.resolve();
                          },
                        }),
                      ]}
                    >                      
                      <Input
                        type='number'
                        placeholder='Add'
                        step='0.25'
                        suffix={suffixPlaceHolder('0.25 steps')}
                      />
                    </Form.Item>                    
                  </td>}
                </tr>
              </tbody>
            </table>
          </Col>}
        </Row>
        <Row >
          <div className='mt-5'>
            <Button style={{ margin: '0 8px' }} onClick={() => props.onPreviousClick()}>
              Previous
            </Button>
            <Button type='primary' htmlType='submit'>
              Next
            </Button>
          </div>
        </Row>
      </Form>
    </div>
  )
}

export default SecondStep