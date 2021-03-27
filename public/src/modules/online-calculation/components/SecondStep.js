import React, { useState } from 'react';
import { Button, Modal, Form, Slider, Input, Row, Col, Typography } from 'antd';
import { isEqual, includes } from 'lodash';
import { useSelector } from 'react-redux';
import { formValidatorRules } from '../../../common/utility'

const { Title } = Typography;
const { confirm } = Modal;

const { number, decimalNumber } = formValidatorRules

const SecondStep = (props) => {
  const [form] = Form.useForm();
  const firstStepData = useSelector(state => state.calculation.firstStep);
  const [leftLenseAdd, setLeftLenseAdd] = useState();
  const [rightLenseAdd, setRightLenseAdd] = useState();
  const isLeftLense = includes(['BOTH', 'LEFT'], firstStepData.lenseType);
  const isRightLense = includes(['BOTH', 'RIGHT'], firstStepData.lenseType);

  const onFinish = (values) => {
    if (values) {
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
  const onLeftLenseAddChange = (value) => {
    setLeftLenseAdd(value);
  }
  const onRightLenseAddChange = (value) => {
    setRightLenseAdd(value);
  }

  return (
    <div className='p-5'>
      <Form
        form={form}
        layout='vertical'
        name='left-right-lense-details'
        initialValues={{ ...props.secondStepData }}
        onFinish={onFinish}
      >
        <Row justify='center'>
          {isLeftLense && <Col className='p-1'>
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
                      ]}
                    >
                      <Input
                        type='number'
                        placeholder='SPH'
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
                      ]}
                    >
                      <Input
                        type='number'
                        placeholder='CYL'
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
                    <div className='d-flex justify-content-center align-items-center'>
                      <div>
                        <Form.Item
                          name='leftAdd'
                          rules={[
                            {
                              required: true,
                              message: 'Please input add',
                            }
                          ]}
                        >
                          <Slider
                            style={{ minWidth: '120px' }}
                            max={4}
                            min={0}
                            step={0.25}
                            onChange={onLeftLenseAddChange}
                          />
                        </Form.Item>
                      </div>
                      <div className='px-2 py-1' style={{ minWidth: '50px' }}>
                        {leftLenseAdd}
                      </div>
                    </div>
                  </td>}
                </tr>
              </tbody>
            </table>
          </Col>}
          {isRightLense && <Col className='p-1'>
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
                      ]}
                    >
                      <Input
                        type='number'
                        placeholder='SPH'
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
                      ]}
                    >
                      <Input
                        type='number'
                        placeholder='CYL'
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
                      />
                    </Form.Item>
                  </td>
                  {firstStepData.lense === 'PROGRESSIVE' && <td style={{ width: '15%' }}>
                    <div className='d-flex justify-content-start'>
                      <div>
                        <Form.Item
                          name='rightAdd'
                          rules={[
                            {
                              required: true,
                              message: 'Please input add',
                            }
                          ]}
                        >
                          <Slider
                            style={{ minWidth: '120px' }}
                            max={4}
                            min={0}
                            step={0.25}
                            onChange={onRightLenseAddChange}
                          />
                        </Form.Item>
                      </div>
                      <div className='px-2 py-1' style={{ minWidth: '50px' }}>
                        {rightLenseAdd}
                      </div>
                    </div>
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