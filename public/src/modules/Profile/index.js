import React, { useEffect, useState } from 'react';
import { Form, Input, Button, DatePicker, Row, Col, Card, Typography, Spin } from 'antd';
import { cloneDeep, get } from 'lodash'
import { apiInstance } from '../../helpers/api';
import { showNotification } from '../../helpers';
import { ROUTES } from 'src/common/constants';

const { Title } = Typography;
const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 8,
  },
};
const tailLayout = {
  wrapperCol: {
    offset: 8,
    span: 8,
  },
};

const Profile = (props) => {
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem('user'));
    if (userData) {
      form.setFieldsValue({ ...userData });
    }
  }, []);



  const onFinish = async (values) => {
    try {
      const { history } = props;
      if (values) {
        const cloneValues = cloneDeep(values);
        setLoading(true);
        const res = await apiInstance('/update-user',{
          method: 'POST',
          data: cloneValues
        });
        const data = get(res, 'data');
        if (data && data.user) {
          localStorage.setItem('user', JSON.stringify(data.user));
          form.setFieldsValue({ ...data.user });
          showNotification('success', 'Update Successfully!');
          history.push(ROUTES.MAIN);
        }
        setLoading(false);
      }
      setLoading(false);
    } catch (error) {
      if (error && error.message) {
        showNotification('error', error.message);
      }
      setLoading(false);
    }
  };

  return (
    <Row type="flex" justify="center" align="middle" style={{ minHeight: '100%' }}>
      <Col xs={24} sm={24} md={24} lg={24} xl={24}>
        <Spin spinning={loading}>
          <Card className='p-5'>
            <div className='row justify-content-center align-items-center'>
              <Title level={2}>Account Details</Title>
            </div>
            <Form {...layout}
              form={form}
              name="user"
              onFinish={onFinish}
              scrollToFirstError
            >
              <Form.Item
                name="first_name"
                label="First Name"
                rules={[
                  {
                    required: true,
                    message: 'Please input your first name!',
                  },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                name="last_name"
                label="Last Name"
                rules={[
                  {
                    required: true,
                    message: 'Please input your last name!',
                  },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                name="email"
                label="E-mail"
              >
                <Input disabled={true} />
              </Form.Item>
              <Form.Item
                name="phone"
                label="Phone Number"
              >
                <Input />
              </Form.Item>
              <Form.Item
                name="company_name"
                label="Company Name"
              >
                <Input />
              </Form.Item>
              {/* <Form.Item
                name="registration_date"
                label="Registaration Date">
                <DatePicker style={{ width: '100%' }} />
              </Form.Item> */}
              <Form.Item
                name="house_number"
                label="House #"
              >
                <Input type="number" />
              </Form.Item>
              <Form.Item
                name="street"
                label="Street Address"
              >
                <Input placeholder="Street" />
              </Form.Item>
              <Form.Item
                name="area_code"
                label="Area Code"
              >
                <Input type="number" />
              </Form.Item>
              <Form.Item
                name="city"
                label="City"
              >
                <Input />
              </Form.Item>
              <Form.Item
                name="country"
                label="Country"
              >
                <Input />
              </Form.Item>
              <Form.Item
                name="website"
                label="Website"
              >
                <Input />
              </Form.Item>
              <Form.Item {...tailLayout}>
                <Button type="primary" htmlType="submit">
                  Update
                </Button>
              </Form.Item>
            </Form>
          </Card>
        </Spin>
      </Col>
    </Row>
  )
}

export default Profile