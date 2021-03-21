import React from 'react';
import { Button, Row } from 'antd';
import { useSelector } from 'react-redux';
import { startCase, toLower, includes } from 'lodash'
import SummaryData from './SummaryData';

const ThirdStep = (props) => {
  const firstStepData = useSelector(state => state.calculation.firstStep)
  const secondStepData = useSelector(state => state.calculation.secondStep)
  const isLeftLense = includes(['BOTH', 'LEFT'], firstStepData.lenseType)
  const isRightLense = includes(['BOTH', 'RIGHT'], firstStepData.lenseType)
  return (
    <div className='p-5'>
      <table className='table table-bordered table-hover table-striped'>
        <thead className='thead-light'>
          <tr>
            <th colSpan='2' scope='col'>{startCase(toLower(firstStepData.lense))}</th>
            <th colSpan='2' scope='col'>{startCase(toLower(firstStepData.lenseDesign))}</th>
            <th scope='col'>{firstStepData.canalLength}</th>
            <th colSpan='2' scope='col'>{firstStepData.material}</th>
          </tr>
        </thead>
        {isLeftLense && <SummaryData
          lenseType='Left Lense'
          sph={secondStepData.leftSph}
          cyl={secondStepData.leftCyl}
          ax={secondStepData.leftAx}
          prvm={secondStepData.leftPrvm}
          prva={secondStepData.leftPrva}
          add={secondStepData.leftAdd}
        />}
        {isRightLense && <SummaryData
          lenseType='Right Lense'
          sph={secondStepData.rightSph}
          cyl={secondStepData.rightCyl}
          ax={secondStepData.rightAx}
          prvm={secondStepData.rightPrvm}
          prva={secondStepData.rightPrva}
          add={secondStepData.rightAdd}
        />}
      </table>
      <Row>
        <div className='mt-5'>
          <Button style={{ margin: '0 8px' }}
            onClick={() => props.onPreviousClick()}>
            Previous
          </Button>
        </div>
      </Row>
      <Row className='mt-5' justify='center'>
        <Button type='primary'
          onClick={() => props.onFinalSubmit()}>
          Start Calculation
        </Button>
      </Row>
    </div>
  )
}

export default ThirdStep