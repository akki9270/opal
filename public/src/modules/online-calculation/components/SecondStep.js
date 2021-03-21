import React from 'react';
import { Button, Modal, Form, Slider, Input, Row, Col, Typography } from 'antd';
import { isEqual, includes } from 'lodash';
import { useSelector } from 'react-redux';
import { formValidatorRules } from '../../../common/utility'

const { Title } = Typography;
const { confirm } = Modal;

const { number, decimalNumber } = formValidatorRules

const SecondStep = (props) => {
  const [form] = Form.useForm();
  const firstStepData = useSelector(state => state.calculation.firstStep)
  const isLeftLense = includes(['BOTH', 'LEFT'], firstStepData.lenseType)
  const isRightLense = includes(['BOTH', 'RIGHT'], firstStepData.lenseType)
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
  return (
    <div className='p-5'>
      <Form
        form={form}
        layout='vertical'
        name='left-right-lense-details'
        initialValues={{ ...props.secondStepData }}
        onFinish={onFinish}
      >
        <Row justify='center' gutter={[8, 8]}>
          {isLeftLense && <Col span={6} className='p-1'>
            <div className='text-center'>
              <Title level={3}>Left Lense</Title>
            </div>
            <Form.Item
              label='SPH'
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
                min={-8}
                max={8}
                placeholder='SPH'
              />
            </Form.Item>
            <Form.Item
              label='CYL'
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
                min={0}
                max={4}
                placeholder='CYL'
              />
            </Form.Item>
            <Form.Item
              label='AX'
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
                min={0}
                max={360}
                placeholder='AX'
              />
            </Form.Item>
            <Form.Item
              label='PRVM'
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
                min={0}
                max={5}
                placeholder='PRVM'
              />
            </Form.Item>
            <Form.Item
              label='PRVA'
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
                min={0}
                max={360}
                placeholder='PRVA'
              />
            </Form.Item>
            {firstStepData.lense === 'PROGRESSIVE' && <Form.Item
              label='Add'
              name='leftAdd'
              rules={[
                {
                  required: true,
                  message: 'Please input add',
                }
              ]}
            >
              <Slider
                max={4}
                min={0}
                step={0.25}
              />
            </Form.Item>}
          </Col>}
          {isRightLense && <Col span={6} className='p-1'>
            <div className='text-center'>
              <Title level={3}>Right Lense</Title>
            </div>
            <Form.Item
              label='SPH'
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
                min={-8}
                max={8}
                placeholder='SPH'
              />
            </Form.Item>
            <Form.Item
              label='CYL'
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
                min={0}
                max={4}
                placeholder='CYL'
              />
            </Form.Item>
            <Form.Item
              label='AX'
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
                min={0}
                max={360}
                placeholder='AX'
              />
            </Form.Item>
            <Form.Item
              label='PRVM'
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
                min={0}
                max={5}
                placeholder='PRVM'
              />
            </Form.Item>
            <Form.Item
              label='PRVA'
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
                min={0}
                max={360}
                placeholder='PRVA'
              />
            </Form.Item>
            {firstStepData.lense === 'PROGRESSIVE' && <Form.Item
              label='Add'
              name='rightAdd'
              rules={[
                {
                  required: true,
                  message: 'Please input add',
                }
              ]}
            >
              <Slider
                max={4}
                min={0}
                step={0.25}
              />
            </Form.Item>}
          </Col>}
        </Row>
        <Row>
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