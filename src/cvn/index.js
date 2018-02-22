import { typeCheck } from '../_internals';

const getCvnType = cvn => {
  const len = cvn.length;

  if (len === 3) {
    return 'norm';
  }

  if (len === 4) {
    return 'amex';
  }

  return false;
};

/**
 * @name cvn
 * @since v2.0.0
 * @description
 * Validates that the string cvn passed in is a valid cvn number
 * @param {String|Number} cvnCode The string cvn we want to validate
 * @return {Object} An object containing a isValid boolean and some info
 *
 * @example
 * cvn('333'); // => { isValid: true, info: 'norm' }
 * cvn('3333'); // => { isValid: true, info: 'amex' }
 * cvn('33433'); // => { isValid: false, info: 'Invalid CVN Code' }
 */
export default cvnCode => {
  if (!typeCheck(cvnCode)) {
    throw new TypeError('cvn should be a string or number type');
  }

  const results = {
    isValid: false,
    cvnType: 'Invalid CVN Code'
  };
  const sanitizedCVN = String(cvnCode).replace(/\D/g, '');

  const type = getCvnType(sanitizedCVN);

  if (type) {
    return {
      isValid: true,
      cvnType: type
    };
  }

  return results;
};
