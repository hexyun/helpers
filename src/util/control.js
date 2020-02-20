import types from './base'
const isFunction = types.isFunction
function noop () {}
// 和 后端的componentFeCompiler process一致
function _isHiddenProp (props, k) {
  const prop = props[k]
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
export const process = function (define, controlProps, keyFn = noop, complexFn = noop) {
  const events = []
  const attrs = []
  const data = {}
  let slots = []
  let slot = false
  if (define && define.props) {
    const props = define.props
    for (const k in props) {
      if (!_isHiddenProp(props, k)) {
        const prop = props[k]
        if (prop.slot) slot = true

        if (isPropEvent && isFunction(complexFn)) {
          const complexEvents = complexFn(controlProps[k], prop._$eventParams)
          if (complexEvents && complexEvents.length > 0) {
            events.push(`@${prop._event}=${complexEvents}`)
          }
          // 事件前台不处理
        } else {
          if (isFunction(keyFn)) {
            const key = keyFn(k)
            attrs.push(`:${kebabCase(k)}="${key}"`)
          }
        }
      }
    }
    if (slot) slots = '#slots#'
  }
  return { events, attrs, data, slots }
}
