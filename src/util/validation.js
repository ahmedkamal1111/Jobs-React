const validate = (val, rules, connectedValue) => {
 
    let isValid = true;
  
    for (var rule in rules) {
        switch(rule){
            case 'isRequired':
                isValid = isValid && requiredValidator(val);
                break;    
            case 'isEmail':
                isValid = isValid && emailValidator(val);
                break;
            case 'menLength':
                isValid = isValid && menLengthValidator(val, rules[rule]);
                break;
            case 'maxLength':
                isValid = isValid && maxLengthValidator(val, rules[rule]);
                break;
            case 'equalTo':
                isValid = isValid && equalToValidator(val, connectedValue[rule]);
                break;
            default:
                return isValid;   
        }  
    }
    return isValid;
}

const requiredValidator = val => val.trim() !== '';

const menLengthValidator = (val, menLen) => val.length >= menLen;

const maxLengthValidator = (val, maxLen) => val.length <= maxLen;

const equalToValidator = (val , checkValue) => val === checkValue;

const emailValidator = val => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(val));  
}

export default validate;