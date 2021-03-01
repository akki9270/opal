import { Result, Button } from 'antd';
import React from 'react';
import { ROUTES } from './common/constants';

const Error404 = (props) => {
  const onBtnClick = () => {
    const { history } = props
    history.push(ROUTES.MAIN)
  }
  return (
    <div className='d-flex h-100 row justify-content-center align-items-center' style={{ backgroundColor: '#fff' }}>
      <Result
        status="404"
        title="404"
        subTitle="Sorry, the page you visited does not exist."
        extra={<Button type="primary" onClick={onBtnClick}>Back Home</Button>}
      />
    </div>
  )
}

export default Error404;
