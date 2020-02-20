/* eslint-disable no-undef */
import layout from './features/layout'
import { process } from '@util/control.js'

describe('process', () => {
  it('process default', async () => {
    const keyFn = k => `${k}_1`
    const result = process(layout, {}, keyFn)
    expect(result.slots).toBe('#slots#')
  })
})
