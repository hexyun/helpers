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
  const events = [] // @event="fn"
  const attrs = [] // :type="type"
  const data = {} // vue data scope
  let slots = [] // slot handle
  let slot = false
  const isKeyFn = isFunction(keyFn)
  const isComplexFn = isFunction(complexFn)
  if (define && define.props) {
    const props = define.props
    for (const k in props) {
      if (!_isHiddenProp(props, k)) {
        const prop = props[k]
        if (prop.slot) slot = true
        if (isPropEvent(prop) && isComplexFn) {
          const complexEvents = complexFn(controlProps[k], prop._$eventParams)
          if (complexEvents && complexEvents.length > 0) {
            // 内置字段，业务需要后续考虑解耦
            events.push(`@${prop._$event}=${complexEvents}`)
          }
          // 事件前台不处理
        } else if (isKeyFn) {
          const key = keyFn(k)
          attrs.push(`:${kebabCase(k)}="${key}"`)
          data[key] = controlProps[k] || null
        }
      }
    }
    if (slot) slots = '#slots#'
  }
  return { events, attrs, data, slots }
}
