export const SIGNUP_REQUESTING = 'SIGNUP_REQUESTING';
export const SIGNUP_SUCCESS = 'SIGNUP_SUCCESS';
export const SIGNUP_ERROR = 'SIGNUP_ERROR';
export const SAVE_FIRST_STEP = 'SAVE_FIRST_STEP';
export const SAVE_SECOND_STEP = 'SAVE_SECOND_STEP';
export const RESET_CALCULATION = 'RESET_CALCULATION';


export function saveFirstStep(payload) {
  return {
    type: SAVE_FIRST_STEP,
    payload
  };
}

export function saveSecondStep(payload) {
  return {
    type: SAVE_SECOND_STEP,
    payload
  };
}

export function resetCalculation() {
  return {
    type: RESET_CALCULATION
  };
}