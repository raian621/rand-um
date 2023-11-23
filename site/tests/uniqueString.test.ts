import { expect, test } from "vitest";
import uniqueString from "util/uniqueString"

test('unique string', () => {
  const result = uniqueString(Date.now())
  expect(result.length).toBe(12)
})