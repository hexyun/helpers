/*!
 * helpers v0.1.0
 * (c) 2020 huangjiangtao@hexdo.com
 * Released under the BSD 3-Clause License.
 */

'use strict'

var _typeof = typeof Symbol === 'function' && typeof Symbol.iterator === 'symbol' ? function (obj) {
  return typeof obj
} : function (obj) {
  return obj && typeof Symbol === 'function' && obj.constructor === Symbol && obj !== Symbol.prototype ? 'symbol' : typeof obj
}

var isBrowser = (typeof window === 'undefined' ? 'undefined' : _typeof(window)) === 'object' && (typeof document === 'undefined' ? 'undefined' : _typeof(document)) === 'object'
var isNode = (typeof global === 'undefined' ? 'undefined' : _typeof(global)) === 'object' && (typeof process === 'undefined' ? 'undefined' : _typeof(process)) === 'object'
var isClientRuntime = isBrowser && window.__isClient
var isApp = isBrowser && window.navigator.userAgent.match(/mobile/)
var detector = {
  isBrowser: isBrowser,
  isNode: isNode,
  isClientRuntime: isClientRuntime,
  isApp: isApp
}

var rules = {}

addRule('mobile', /^1\d{10}$/, '{{text}}的格式不正确')
addRule('min', function (val, rule) {
  return Number(val) >= Number(rule)
}, '{{text}}必须大于或等于{{min}}')
addRule('max', function (val, rule) {
  return Number(val) <= Number(rule)
}, '{{text}}必须小于或等于{{max}}')
addRule('email', /^\s*([a-zA-Z0-9_\.\-\+])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,20})\s*$/, '{{text}}的格式不正确')
addRule('url', /^(http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?$/, '{{text}}的格式不正确')
addRule('minlength', function (val, rule) {
  return (val || '').toString().length >= Number(rule)
}, '{{text}}的长度必须大于或等于{{minlength}}')
addRule('maxlength', function (val, rule) {
  return (val || '').toString().length <= Number(rule)
}, '{{text}}的长度必须小于或等于{{maxlength}}')
addRule('date', /^\d{4}\-[01]?\d\-[0-3]?\d$|^[01]\d\/[0-3]\d\/\d{4}$|^\d{4}年[01]?\d月[0-3]?\d[日号]$/, '{{text}}的格式不正确')
addRule('number', /^[+-]?[1-9][0-9]*(\.[0-9]+)?([eE][+-][1-9][0-9]*)?$|^[+-]?0?\.[0-9]+([eE][+-][1-9][0-9]*)?$|^0$/, '{{text}}的格式不正确')

addRule('required', function (val, rule) {
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

  var exec = function exec (val, rule) {
    return toArray(val).every(function (item) {
      return operator(item, rule)
    })
  }

  if (operator instanceof RegExp) {
    exec = function exec (val, rule) {
      return toArray(val).every(function (item) {
        return operator.test(item)
      })
    }
  }

  rules[name] = { exec: exec, message: message }
}

function getRule (name) {
  return rules[name] ? rules[name] : {
    exec: function exec () {},

    message: ''
  }
}

function isBoolean (obj) {
  return obj === true || obj === false
}

function toArray (obj) {
  return Array.isArray(obj) ? obj : [obj]
}

var rules$1 = {
  addRule: addRule,
  getRule: getRule
}

var Validator = {}

var fixStyle = function fixStyle () {}
var processFeComponent = function processFeComponent () {}
var getSlotsTemplate = function getSlotsTemplate () {}
var controlCompiler = {
  fixStyle: fixStyle,
  processFeComponent: processFeComponent,
  getSlotsTemplate: getSlotsTemplate
}

var index = {
  detector: detector,
  rules: rules$1,
  Validator: Validator,
  controlCompiler: controlCompiler
}

module.exports = index
