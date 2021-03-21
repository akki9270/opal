import React, { useState, useEffect } from 'react';
import { Steps, Card, Spin } from 'antd';
import { useDispatch, useSelector } from "react-redux";
import { get } from 'lodash';
import { apiInstance } from '../../../helpers/api';
import { showNotification } from '../../../helpers';
import { ROUTES } from '../../../common/constants';

import FirstStep from '../components/FirstStep';
import SecondStep from '../components/SecondStep';
import ThirdStep from '../components/ThirdStep';

import { saveFirstStep, saveSecondStep, resetCalculation } from "../actions";

const { Step } = Steps;

const steps = [
  {
    title: 'First',
    content: 'First-content',
  },
  {
    title: 'Second',
    content: 'Second-content',
  },
  {
    title: 'Last',
    content: 'Last-content',
  },
];

const OnlineCalculation = (props) => {
  const [current, setCurrent] = useState(0);
  const [loading, setLoading] = useState(false);
  const { history } = props;

  const dispatch = useDispatch();
  const formData = useSelector(state => state.calculation);
  const { firstStep: firstStepData, secondStep: secondStepData } = formData;

  useEffect(() => {    
    return () => {
      dispatch(resetCalculation())
    }
  }, [])

  const next = () => {
    setCurrent(current + 1);
  };

  const prev = () => {
    setCurrent(current - 1);
  };

  const onSaveFirstStepData = (data) => {    
    dispatch(saveFirstStep(data))
    next();
  };

  const onSaveSecondStepData = (data) => {    
    dispatch(saveSecondStep(data));
    next();
  };

  const getModifyLeftLenseData = (data) => {
    let cloneData = {
      sph: parseFloat(data.leftSph),
      cyl: parseFloat(data.leftCyl),
      ax: parseInt(data.leftAx),
      prvm: parseFloat(data.leftPrvm),
      prva: parseInt(data.leftPrva)
    }
    if (data.leftAdd) {
      cloneData.add = data.leftAdd;
    } else {
      delete cloneData['add'];
    }
    return cloneData;
  }

  const getModifyRightLenseData = (data) => {
    let cloneData = {
      sph: parseFloat(data.rightSph),
      cyl: parseFloat(data.rightCyl),
      ax: parseInt(data.rightAx),
      prvm: parseFloat(data.rightPrvm),
      prva: parseInt(data.rightPrva)
    }
    if (data.rightAdd) {
      cloneData.add = data.rightAdd;
    } else {
      delete cloneData['add'];
    }
    return cloneData;
  }

  const modifyCalculationData = (data) => {
    let cloneData = {};
    cloneData.lense = data.firstStep.lense;
    cloneData.lenseType = data.firstStep.lenseType;
    if (data.firstStep.lenseDesign) {
      cloneData.lenseType = data.firstStep.lenseType;
    }
    if (data.firstStep.canalLength) {
      cloneData.canalLength = data.firstStep.canalLength;
    }
    if (data.firstStep.material) {
      cloneData.material = data.firstStep.material;
    }
    if (data.firstStep.lenseType === 'BOTH') {
      cloneData.leftLense = getModifyLeftLenseData(data.secondStep);
      cloneData.rightLense = getModifyRightLenseData(data.secondStep);
    } else if (data.firstStep.lenseType === 'LEFT') {
      cloneData.leftLense = getModifyLeftLenseData(data.secondStep);
    } else {
      cloneData.rightLense = getModifyRightLenseData(data.secondStep);
    }
    return cloneData;
  }

  const onFinalSubmit = async () => {    
    if (formData) {
      try {
        setLoading(true)
        const finalData = await modifyCalculationData(formData);
        console.log('--finalData: ', finalData); 
        const res = await apiInstance('post', '/online-calculation', finalData);
        const data = get(res, 'data');
        if (data) {
          showNotification('success', 'Calcualtion Successfully!');
          dispatch(resetCalculation())
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
  };

  return (
    <div>
      <Spin spinning={loading}>
        <Card className='p-5' style={{ minHeight: '100%' }}>
          <Steps current={current}>
            {steps.map(item => (
              <Step key={item.title} title={item.title} />
            ))}
          </Steps>
          <div className="steps-content">
            {
              current === 0 &&
              <FirstStep currentStep={current}
                firstStepData={firstStepData}
                steps={steps}
                onSaveFirstStepData={onSaveFirstStepData}
              />
            }
            {
              current === 1 &&
              <SecondStep currentStep={current}
                secondStepData={secondStepData}
                steps={steps}
                onPreviousClick={prev}
                onSaveSecondStepData={onSaveSecondStepData}
              />
            }
            {
              current === 2 &&
              <ThirdStep currentStep={current}
                steps={steps}
                onPreviousClick={prev}
                onFinalSubmit={onFinalSubmit}
              />
            }
          </div>
        </Card>
      </Spin>
    </div>
  )
}

export default OnlineCalculation;
