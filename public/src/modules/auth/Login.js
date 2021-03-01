import React, { useState } from 'react'
import { Form, Input, Button, Checkbox, Row, Col, Card, Typography, Spin } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { get } from 'lodash';
import { ROUTES } from 'src/common/constants';
import { apiInstance } from '../../helpers/api';
import { showNotification } from '../../helpers';
import ForgotPasswordModal from './ForgotPassword';
// import { connect } from 'react-redux';
// import { withRouter } from 'react-router';
// import { loginRequest, loginPageInit } from './actions';

// function mapStateToProps(state) {
//   return {
//     loading: state.auth.requesting,
//     errors: state.auth.errors
//   };
// }

// function mapDispatchToProps(dispatch) {
//   return {
//     onSubmitForm: (formData) => {
//       if (formData) {
//         dispatch(loginRequest(formData));
//       }
//     },
//     onPageInit: dispatch(loginPageInit())
//   };
// }

const { Title } = Typography;

const Login = (props) => {
  const [loading, setLoading] = useState(false);
  const [visibleForgotPasswordForm, setVisibleForgotPasswordForm] = useState(false);
  const { history } = props;
  const onFinish = async (values) => {
    // console.log('Received values of form: ', values);
    if (values) {
      try {
        const { email, password } = values;
        // props.onSubmitForm({ email, password });
        setLoading(true);
        const res = await apiInstance('post', '/auth/signin', { email, password });
        const data = get(res, 'data');
        if (data && data.user && data.token) {
          localStorage.setItem('user', JSON.stringify(data.user));
          localStorage.setItem('token', data.token);
          showNotification('success', 'Login Successfully!');
          history.push(ROUTES.MAIN);
        }
        setLoading(false);
      } catch (error) {
        if (error && error.message) {
          showNotification('error', error.message);
        }
        setLoading(false);
      }
    }
  };

  return (
    <Row type="flex" justify="center" align="middle" style={{ minHeight: '100%' }}>
      <Col xs={20} sm={16} md={6} lg={6} xl={6}>
        <Spin spinning={loading}>
          <Card>
            <div className='row justify-content-center align-items-center'>
              <Title level={2}>Login Form</Title>
            </div>
            <Form
              name="normal_login"
              className="login-form"
              initialValues={{
                remember: true,
              }}
              onFinish={onFinish}
            >
              <Form.Item
                name="email"
                rules={[
                  {
                    required: true,
                    message: 'Please input your email!',
                  },
                  {
                    type: 'email',
                    message: 'Please input valid email!',
                  }
                ]}
              >
                <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Email" />
              </Form.Item>
              <Form.Item
                name="password"
                rules={[
                  {
                    required: true,
                    message: 'Please input your Password!',
                  },
                ]}
              >
                <Input
                  prefix={<LockOutlined className="site-form-item-icon" />}
                  type="password"
                  placeholder="Password"
                />
              </Form.Item>
              <Form.Item>
                <Form.Item name="remember" valuePropName="checked" noStyle>
                  <Checkbox>Remember me</Checkbox>
                </Form.Item>

                <a className="login-form-forgot" onClick={() => setVisibleForgotPasswordForm(true)}>
                  Forgot password
                </a>
              </Form.Item>

              <Form.Item>
                <div className='d-flex justify-content-start align-items-center'>
                  <Button type="primary" htmlType="submit" className="login-form-button">
                    Log in
                </Button>
                  <div className='pl-2'>
                    Or <Link to={ROUTES.SIGNUP}>Register now!</Link>
                  </div>
                </div>
              </Form.Item>
            </Form>
          </Card>
        </Spin>
      </Col>
      {visibleForgotPasswordForm && <ForgotPasswordModal
        visibleForgotPasswordForm={visibleForgotPasswordForm}
        setVisibleForgotPasswordForm={setVisibleForgotPasswordForm}
      />}
    </Row>
  );
};

export default Login

// export default connect(
//   mapStateToProps,
//   mapDispatchToProps,
// )(withRouter(Login));