'use strict';

const type = t => Object.prototype.toString.call(t).match(/\[object (\w+)\]/)[1];

const typeList = ['Array', 'Object', 'Undefined', 'Null', 'Function', 'RegExp', 'Date'];

var types = typeList.reduce((l, p) => {
  l[`is${p}`] = t => {
    return type(t) === p
  };
  return l
}, {});

var types$1 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  'default': types
});

const isBrowser = () => undefined(window) && undefined(document);
const isNode = () => undefined(global) && undefined(process) && undefined(process.cwd);
const isClientRuntime = () => isBrowser() && window.__client;
const isApp = () => isBrowser() && window.navigator.userAgent.match(/mobile/);

var detector = {
  isBrowser,
  isNode,
  isClientRuntime,
  isApp
};

var detector$1 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  'default': detector
});

/* eslint-disable no-useless-escape */
const rules = {};

addRule('mobile', /^1\d{10}$/, '{{text}}的格式不正确');
addRule('min', (val, rule) => Number(val) >= Number(rule), '{{text}}必须大于或等于{{min}}');
addRule('max', (val, rule) => Number(val) <= Number(rule), '{{text}}必须小于或等于{{max}}');
addRule('email', /^\s*([a-zA-Z0-9_\.\-\+])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,20})\s*$/, '{{text}}的格式不正确');
addRule('url', /^(http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?$/, '{{text}}的格式不正确');
addRule('minlength', (val, rule) => (val || '').toString().length >= Number(rule), '{{text}}的长度必须大于或等于{{minlength}}');
addRule('maxlength', (val, rule) => (val || '').toString().length <= Number(rule), '{{text}}的长度必须小于或等于{{maxlength}}');
addRule('date', /^\d{4}\-[01]?\d\-[0-3]?\d$|^[01]\d\/[0-3]\d\/\d{4}$|^\d{4}年[01]?\d月[0-3]?\d[日号]$/, '{{text}}的格式不正确');
addRule('number', /^[+-]?[1-9][0-9]*(\.[0-9]+)?([eE][+-][1-9][0-9]*)?$|^[+-]?0?\.[0-9]+([eE][+-][1-9][0-9]*)?$|^0$/, '{{text}}的格式不正确');

addRule('required', (val, rule) => {
  if (isBoolean(val)) {
    return true
  }

  if (val === 0) {
    return true
  }

  return typeof val === 'string' ? val.trim() : val
}, '请输入{{text}}');

function addRule (name, operator, message, silent) {
  if (rules[name] && !silent) {
    throw new Error('Rule already exists')
  }

  let exec = (val, rule) => toArray(val).every((item) => operator(item, rule));

  if (operator instanceof RegExp) {
    exec = (val, rule) => toArray(val).every((item) => operator.test(item));
  }

  rules[name] = { exec, message };
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

var rule = {
  get: getRule,
  add: addRule
};

var rule$1 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  'default': rule
});

class Validator {

}

const isFunction = types.isFunction;
function noop () {}
// 和 后端的componentFeCompiler process一致
function _isHiddenProp (props, k) {
  const prop = props[k];
  return prop.type === 'not-show' || props.type === 'hidden' || /^\[\w+\]$/.test(k)
}
function kebabCase (k) {
  return k.replace(/[A-Z]/g, $0 => `-${$0.toLowerCase()}`)
}
function isPropEvent (prop) {
  return '_$event' in prop && prop.type === 'complex-events'
}
/**
 *
 * @param {*} define control的define定义
 * @param {*} controlProps control的真实属性定义
 * @param {*} keyFn 循环对每个key的处理函数
 * @param {*} complexFn 循环对每个complex的处理函数
 */
const process$1 = function (define, controlProps, keyFn = noop, complexFn = noop) {
  const events = [];
  const attrs = [];
  const data = {};
  let slots = [];
  let slot = false;
  const isKeyFn = isFunction(keyFn);
  const isComplexFn = isFunction(complexFn);
  if (define && define.props) {
    const props = define.props;
    for (const k in props) {
      if (!_isHiddenProp(props, k)) {
        const prop = props[k];
        if (prop.slot) slot = true;
        if (isPropEvent(prop) && isComplexFn) {
          const complexEvents = complexFn(controlProps[k], prop._$eventParams);
          if (complexEvents && complexEvents.length > 0) {
            events.push(`@${prop._event}=${complexEvents}`);
          }
          // 事件前台不处理
        } else if (isKeyFn) {
          const key = keyFn(k);
          attrs.push(`:${kebabCase(k)}="${key}"`);
        }
      }
    }
    if (slot) slots = '#slots#';
  }
  return { events, attrs, data, slots }
};

var control = /*#__PURE__*/Object.freeze({
  __proto__: null,
  process: process$1
});

var main = {
  detector: detector$1,
  rule: rule$1,
  Validator,
  control
};

module.exports = main;
