import React from 'react';
import { Layout } from 'antd';
import AppHeader from './AppHeader';
import ContentRoutes from './ContentRoutes';
import './App.css';

const { Content, Footer } = Layout;

const App = () => {
  return (
    <Layout className='layout-container'>
      <AppHeader />
      <Content className='content-container'>
        <ContentRoutes />
      </Content>
      <Footer>
        <div>OPAL © 2021</div>
      </Footer>
    </Layout>
  );
};

export default App
