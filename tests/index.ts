import { describe, it } from "node:test";
import assert from "node:assert";

describe('test test', () => {
  it('adds 1 + 2 to equal 3', () => {
    assert.strictEqual(1 + 2, 3);
  });
});