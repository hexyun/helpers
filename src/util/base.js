const type = t => Object.prototype.toString.call(t).match(/\[object (\w+)\]/)[1]

const typeList = ['Array', 'Object', 'Undefined', 'Null', 'Function', 'RegExp', 'Date']

export default typeList.reduce((l, p) => {
  l[`is${p}`] = t => {
    return type(t) === p
  }
  return l
}, {})
