import { REGEX } from "../common/constants";

export const formValidatorRules = { 
  number: (min, max) => ({
    validator(rule, value) {
      if (!value) {
        return Promise.resolve();
      }      
      if (!Number(value) || !REGEX.NUMBER.test(Number(value))) {
        return Promise.reject('Should be a valid Number');
      } else if (parseInt(min) && parseInt(max) && (min > parseInt(value) || max < parseInt(value))) {
        return Promise.reject(`Range should be between ${min} and ${max}`);
      }
      return Promise.resolve();
    },
  }),
  decimalNumber: (min = undefined, max = undefined) => ({
    validator(rule, value) {
      if (!value) {
        return Promise.resolve();
      }      
      if (!Number(value) || !REGEX.DECIMAL_NUMBER.test(Number(value))) {
        return Promise.reject('Should be a valid Number');
      } else if (parseFloat(min) && parseFloat(max) && (min > parseFloat(value) || max < parseFloat(value))) {
        return Promise.reject(`Range should be between ${min} and ${max}`);
      }
      return Promise.resolve();
    },
  }),
};