const type = type => Object.prototype.toString.call('').match(/\[object (\w+)\]/)

const typeList = ['Array', 'Object', 'Undefined', 'Null', 'Function', 'RegExp', 'Date']

export default typeList.reduce((l, p) => {
  l[`is${p}`] = t => type(t) === p
  return l
}, {})
