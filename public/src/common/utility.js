import { REGEX } from "../common/constants";

export const formValidatorRules = { 
  number: (min=undefined, max=undefined) => ({
    validator(rule, value) {           
      let parseValue = parseInt(value)
      if (!parseValue) {
        return Promise.resolve();
      }            
      if (!Number(parseValue) || !REGEX.NUMBER.test(Number(parseValue))) {
        return Promise.reject('Should be a valid Number');
      } else if ((min > parseInt(parseValue)) || (max < parseInt(parseValue))) {        
        return Promise.reject(`should be between ${min} and ${max}`);
      }
      return Promise.resolve();
    },
  }),
  decimalNumber: (min = undefined, max = undefined) => ({
    validator(rule, value) {   
      let parseValue = parseFloat(value)
      if (!parseValue) {
        return Promise.resolve();
      }            
      if (!Number(parseValue) || !REGEX.DECIMAL_NUMBER.test(Number(parseValue))) {
        return Promise.reject('Should be a valid Number');
      } else if ((min > parseFloat(parseValue)) || (max < parseFloat(parseValue))) {
        console.log('else if parseValue: ', parseValue)
        return Promise.reject(`should be between ${min} and ${max}`);
      }
      return Promise.resolve();
    },
  }),
};