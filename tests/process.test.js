/* eslint-disable no-undef */
import layout from './features/layout'
import { process } from '@util/control.js'

describe('process', () => {
  it('process default', async () => {
    const keyFn = k => `${k}_1`
    const complexFn = (k) => {
      const events = []
      events.push(`flow_${k}`)
    }
    const result = process(layout.define, layout.data, keyFn, complexFn)
    expect(result.slots).toBe('#slots#')
    expect(result.attrs.length).toBe(Object.keys(layout.define.props).length)
  })
})
