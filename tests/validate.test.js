/* eslint-disable no-undef */
import 'babel-polyfill'
import Validator from '@validator/Validator.js'

const validator = new Validator({
  valueKey: 'value',
  ruleKey: 'rule'
})
describe('Validator', () => {
  it('[rule] mobile', async () => {
    expect(validator.validateField({ value: 18637136111, rule: 'mobile' })).toBe(true)
    expect(validator.validateField({ value: 1776611899, rule: 'mobile' })).toBe(false)
  })
  it('[rule] email', async () => {
    expect(validator.validateField({ value: '11@qq.com', rule: 'email' })).toBe(true)
    expect(validator.validateField({ value: 'xx@sina.com.cn', rule: 'email' })).toBe(true)
    expect(validator.validateField({ value: 'ccc@jiangtao.com', rule: 'email' })).toBe(true)
    expect(validator.validateField({ value: 'ccc#jiangtao.com', rule: 'email' })).toBe(false)
  })
  it('[rule] pwdstrength', async () => {
    expect(validator.validateField({ value: 'jaaa', rule: 'pwdstrength' })).toBe(false)
    expect(validator.validateField({ value: '1776611899', rule: 'pwdstrength' })).toBe(false)
    expect(validator.validateField({ value: 'ja12345', rule: 'pwdstrength' })).toBe(true)
    expect(validator.validateField({ value: 'Ja123456', rule: 'pwdstrength' })).toBe(true)
    expect(validator.validateField({ value: 'j123', rule: 'pwdstrength' })).toBe(false)
  })
  it('[rule] date', async () => {
    expect(validator.validateField({ value: 'Ja123456', rule: 'pwdstrength' })).toBe(true)
  })
  it('[rule] number', async () => {

  })
  it('[rule] idcard', async () => {

  })
  it('[rule] dollar', async () => {

  })
  it('[rule] ipv4', async () => {

  })
  it('[rule] pwdstrength', async () => {

  })
  it('[rule] chinese', async () => {

  })
  it('[rule] required', async () => {

  })
})
