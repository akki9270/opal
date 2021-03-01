import React from 'react';
import { withRouter } from 'react-router-dom'
import { Layout, Menu } from 'antd';
import { ROUTES } from '../../common/constants';
import { isAuthenticated, logout, showNotification } from '../../helpers'
import logo from '../../assets/logo192.png'
import '../App.css'

const { Header } = Layout;

const AppHeader = (props) => {
  const { location: { pathname }, history } = props;
  const onMenuSelect = e => {
    if (e.key === ROUTES.LOGOUT) {
      logout()
      showNotification('success', 'Logout Successfully')
      history.push(ROUTES.MAIN);
    } else if(e.key === ROUTES.CALCULATION && !isAuthenticated()){
      showNotification('error', 'You must first log in before using online calculation.');
    } else {
      history.push(e.key);
    }
  };
  const onLogoImgClick = () => {
    history.push(ROUTES.MAIN);
  };
  return (
    <Header>
      <div className="logo">
        <img src={logo} className='logo-img'
          onClick={onLogoImgClick} />
      </div>
      <Menu
        theme="dark"
        mode="horizontal"
        selectedKeys={[`/${pathname.split('/')[1]}`]}
        defaultSelectedKeys={[ROUTES.MAIN]}
        onSelect={onMenuSelect}
      >
        <Menu.Item key={ROUTES.PRODUCT}>Product</Menu.Item>
        <Menu.Item key={ROUTES.CALCULATION}>Online Calculation</Menu.Item>
        <Menu.Item key={ROUTES.DOCS}>Docs</Menu.Item>
        <Menu.Item key={ROUTES.COMPANY}>Company</Menu.Item>
        <Menu.Item key={ROUTES.CONTACT}>Contact</Menu.Item>
        {!isAuthenticated() && <Menu.Item key={ROUTES.SIGNUP} className='right-menu'>Register</Menu.Item>}
        {!isAuthenticated() && <Menu.Item key={ROUTES.LOGIN} className='right-menu' >Login</Menu.Item>}
        {isAuthenticated() && <Menu.Item key={ROUTES.LOGOUT} className='right-menu' >Logout</Menu.Item>}
        {isAuthenticated() && <Menu.Item key={ROUTES.PROFILE} className='right-menu' >Account</Menu.Item>}
      </Menu>
    </Header>
  );
};
export default withRouter(AppHeader);
