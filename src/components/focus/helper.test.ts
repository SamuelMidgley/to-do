import { expect, test } from 'vitest'
import { getCountdownText } from './helper'

test('Get countdown text', () => {
  expect(getCountdownText(5)).toBe('5s')
  expect(getCountdownText(30)).toBe('30s')
  expect(getCountdownText(60)).toBe('1m 0s')
  expect(getCountdownText(90)).toBe('1m 30s')
  expect(getCountdownText(105)).toBe('1m 45s')
  expect(getCountdownText(3900)).toBe('1h 5m 0s')
  expect(getCountdownText(4215)).toBe('1h 10m 15s')
})
