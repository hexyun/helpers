/* eslint-disable no-useless-escape */
const rules = {}

addRule('mobile', /^1\d{10}$/, '{{text}}的格式不正确')
addRule('min', (val, rule) => Number(val) >= Number(rule), '{{text}}必须大于或等于{{min}}')
addRule('max', (val, rule) => Number(val) <= Number(rule), '{{text}}必须小于或等于{{max}}')
addRule('email', /^\s*([a-zA-Z0-9_\.\-\+])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,20})\s*$/, '{{text}}的格式不正确')
addRule('url', /^(http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?$/, '{{text}}的格式不正确')
addRule('minlength', (val, rule) => (val || '').toString().length >= Number(rule), '{{text}}的长度必须大于或等于{{minlength}}')
addRule('maxlength', (val, rule) => (val || '').toString().length <= Number(rule), '{{text}}的长度必须小于或等于{{maxlength}}')
addRule('date', /^\d{4}\-[01]?\d\-[0-3]?\d$|^[01]\d\/[0-3]\d\/\d{4}$|^\d{4}年[01]?\d月[0-3]?\d[日号]$/, '{{text}}的格式不正确')
addRule('number', /^[+-]?[1-9][0-9]*(\.[0-9]+)?([eE][+-][1-9][0-9]*)?$|^[+-]?0?\.[0-9]+([eE][+-][1-9][0-9]*)?$|^0$/, '{{text}}的格式不正确')

addRule('required', (val, rule) => {
  if (isBoolean(val)) {
    return true
  }

  if (val === 0) {
    return true
  }

  return typeof val === 'string' ? val.trim() : val
}, '请输入{{text}}')

function addRule (name, operator, message, silent) {
  if (rules[name] && !silent) {
    throw new Error('Rule already exists')
  }

  let exec = (val, rule) => toArray(val).every((item) => operator(item, rule))

  if (operator instanceof RegExp) {
    exec = (val, rule) => toArray(val).every((item) => operator.test(item))
  }

  rules[name] = { exec, message }
}

function getRule (name) {
  return rules[name] ? rules[name] : {
    exec () {},
    message: ''
  }
}

function isBoolean (obj) {
  return obj === true || obj === false
}

function toArray (obj) {
  return Array.isArray(obj) ? obj : [obj]
}

export default {
  addRule,
  getRule
}
