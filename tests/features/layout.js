const define = {
  type: 'hex-layout',
  group: 'layout',
  name: '页面布局',
  isForm: true,
  isLayout: true,
  props: {
    menu: {
      name: '菜单区域',
      placeholder: '菜单区域控件id',
      slot: true
    },
    content: {
      name: '内容区域',
      placeholder: '内容区域控件id',
      slot: true
    },
    footer: {
      name: '底部区域',
      placeholder: '底部区域控件id',
      slot: true
    }
  },
  style: {
    width: 300,
    height: 300
  },
  // 新的events 用来处理编译用
  interfaces: {
  },

  // events 保证原来不报错
  events: {}
}
const data = {
  type: 'hex-layout',
  name: 'hex-layout-1',
  props: {
    menu: '11',
    content: '22',
    footer: '33'
  }
}
export default {
  data, define
}
