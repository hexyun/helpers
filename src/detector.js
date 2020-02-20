const isBrowser = typeof window === 'object' && typeof document === 'object'
const isNode = typeof global === 'object' && typeof process === 'object'
const isClientRuntime = isBrowser && window.__isClient
const isApp = isBrowser && window.navigator.userAgent.match(/mobile/)
module.exports = {
  isBrowser,
  isNode,
  isClientRuntime,
  isApp
}
