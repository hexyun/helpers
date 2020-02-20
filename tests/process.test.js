/* eslint-disable no-undef */
const layout = require('./features/layout')
const { process } = require('@util/control.js')

describe('process', () => {
  it('process default', async () => {
    const keyFn = k => `${k}_1`
    const result = process(layout, {}, keyFn)
    expect(result.slots).toBe('#slots#')
  })
})
