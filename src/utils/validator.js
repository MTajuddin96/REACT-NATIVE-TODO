const Validate = (val, rules, prevPassword) => {
  let isValid = true;
  for (const rule in rules) { 
    switch (rule) {
      case 'isEmail':
        isValid = isValid && emailValidator(val);
        break;
      case 'minLength':
        isValid = isValid && minLengthValidator(val, rules[rule]);
        break;
      case 'equalTo':
        isValid = isValid && confirmPasswordValidator(val, prevPassword);
        break;
      default:
        isValid = true;
    }
  }
  return isValid;
};

const emailValidator = val => {
  const re = /^([\w-.]+@([\w-]+\.)+[\w-]+)?$/;
  return re.test(String(val).toLowerCase());
};

const minLengthValidator = (val, minLength) => {
  return val.length >= minLength;
};

const confirmPasswordValidator = (val, prevPassword) => {
  return val === prevPassword;
};
export { Validate };
