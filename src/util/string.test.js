require('../util/path');
const {
  truncate,
  truncateFront,
  zeroPad,
  removeWhitespace,
  lowercase,
} = required('util/string');
// const request = require('supertest');
// const server = require('../server');
// const db = required('db/db');

// beforeAll(async () => {
//   await db.migrate.rollback();
//   await db.migrate.latest();
// });
// beforeEach(async () => {
//   await db.seed.run();
// });
// afterAll(async () => {
//   await db.destroy();
// });

// ==============================================
// ==============================================
// ==============================================
// ==============================================

describe('util/string.js', () => {

  // ==============================================

  it('sanity check', () => {
    expect(true).not.toBe(false)
  });

  // ==============================================

  it('is the correct testing environment', async () => {
    expect(process.env.NODE_ENV).toBe('testing');
  });

  // ==============================================

  it('truncate()', async () => {
    // ('123456789')    =>   "123456..."
    expect( truncate({ str: '123456789' }) ).toBe("123456...");

    // ('123456789', 1)    =>   "1..."
    expect( truncate({ str: '123456789', len: 1 }) ).toBe("1...");

    // ('123456789', 2)    =>   "12..."
    expect( truncate({ str: '123456789', len: 2 }) ).toBe("12...");

    // ('123456789', 3)    =>   "123..."
    expect( truncate({ str: '123456789', len: 3 }) ).toBe("123...");

    // ('123456789', 8)    =>   "12345678..."
    expect( truncate({ str: '123456789', len: 8 }) ).toBe("12345678...");
  });

  // ==============================================

  it('zeroPad()', async () => {
    // (7)    =>   "07"
    expect( zeroPad(7) ).toBe("07");
    expect( zeroPad(7) ).not.toBe("7");

    // (7, 2) =>   "07"
    expect( zeroPad(7, 2) ).toBe("07");
    expect( zeroPad(7, 2) ).not.toBe("7");

    // (7, 3) =>  "007
    expect( zeroPad(7, 3) ).toBe("007");
    expect( zeroPad(7, 3) ).not.toBe("07");
    expect( zeroPad(7, 3) ).not.toBe("7");
  });

  // ==============================================

  it('removeWhitespace()', async () => {
    // 'a b c d'    =>   "abcd"
    expect(removeWhitespace('a b c d') ).toBe("abcd");

    // ' ab cd '    =>   "abcd"
    expect(removeWhitespace(' ab cd ') ).toBe("abcd");
  });

  // ==============================================

  it('lowercase()', async () => {
    // 'A b C d'    =>   "a b c d"
    expect(lowercase('A b C d') ).toBe("a b c d");
  });

  // ==============================================
});