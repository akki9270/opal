import React, { useState } from 'react';
import { Form, Input, Button, Checkbox, Row, Col, Card, Typography, Spin } from 'antd';
// import { connect } from 'react-redux';
// import { withRouter } from 'react-router';
// import { signupRequest, signupPageInit } from './actions';
import { get } from 'lodash';
import { apiInstance } from '../../helpers/api';
import { showNotification } from '../../helpers';
import { ROUTES } from 'src/common/constants';

const { Title } = Typography;
const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
};
const tailLayout = {
  wrapperCol: {
    offset: 8,
    span: 16,
  },
};

// function mapStateToProps(state) {
//   return {
//     errors: state.auth.errors,
//     user: state.auth.user,
//     requesting: state.auth.requesting
//   };
// }

// function mapDispatchToProps(dispatch) {
//   return {
//     onSubmitForm: (formData) => {
//       if (formData) {
//         dispatch(signupRequest(formData));
//       }
//     },
//     onPageInit: dispatch(signupPageInit())
//   };
// }

const Signup = (props) => {
  const [loading, setLoading] = useState(false);
  const { history } = props;
  const [form] = Form.useForm();

  const onFinish = async (values) => {
    if (values) {      
      try {
        setLoading(true)
        const res = await apiInstance('post', '/auth/signup', values);
        const data = get(res, 'data');
        if (data) {
          showNotification('success', 'Signup Successfully!');
          doLogin(values)
        }        
      } catch (error) {
        if (error && error.message) {
          showNotification('error', error.message);
        }
        setLoading(false);
      }
    }
  };

  const doLogin = async(values) => {
    if (values) {
      try {
        const { email, password } = values;        
        setLoading(true);
        const res = await apiInstance('post', '/auth/signin', { email, password });
        const data = get(res, 'data');
        if (data && data.user && data.token) {
          localStorage.setItem('user', JSON.stringify(data.user));
          localStorage.setItem('token', data.token);
          showNotification('success', 'Login Successfully!');
          history.push(ROUTES.MAIN);
        }        
      } catch (error) {
        if (error && error.message) {
          showNotification('error', error.message);
        }        
      } finally {
        setLoading(false);
      }
    }
  }

  return (
    <Row type="flex" justify="center" align="middle" style={{ minHeight: '100%' }}>
      <Col xs={20} sm={16} md={16} lg={10} xl={8}>
        <Spin spinning={loading}>
          <Card className='p-5'>
            <div className='row justify-content-center align-items-center mb-5'>
              <Title level={2}>Signup Form</Title>
            </div>
            <Form {...layout}
              form={form}
              name="register"
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
                rules={[
                  {
                    type: 'email',
                    message: 'The input is not valid E-mail!',
                  },
                  {
                    required: true,
                    message: 'Please input your E-mail!',
                  },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                name="password"
                label="Password"
                rules={[
                  {
                    required: true,
                    message: 'Please input your password!',
                  },
                ]}
                hasFeedback
              >
                <Input.Password />
              </Form.Item>
              <Form.Item
                name="confirm"
                label="Confirm Password"
                dependencies={['password']}
                hasFeedback
                rules={[
                  {
                    required: true,
                    message: 'Please confirm your password!',
                  },
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (!value || getFieldValue('password') === value) {
                        return Promise.resolve();
                      }

                      return Promise.reject('The two passwords that you entered do not match!');
                    },
                  }),
                ]}
              >
                <Input.Password />
              </Form.Item>
              <Form.Item {...tailLayout}>
                <Button type="primary" htmlType="submit">
                  Register
              </Button>
              </Form.Item>
            </Form>
          </Card>
        </Spin>
      </Col>
    </Row>
  );
};

export default Signup;

// export default connect(
//   mapStateToProps,
//   mapDispatchToProps,
// )(withRouter(Signup));