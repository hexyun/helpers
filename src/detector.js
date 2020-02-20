import * as types from './util/base'
const isBrowser = () => types.isObject(window) && types.isObject(document)
const isNode = () => types.isObject(global) && types.isObject(process) && types.isFunction(process.cwd)
const isClientRuntime = () => isBrowser() && window.__client
const isApp = () => isBrowser() && window.navigator.userAgent.match(/mobile/)

export default {
  isBrowser,
  isNode,
  isClientRuntime,
  isApp
}
