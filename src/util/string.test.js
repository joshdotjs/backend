require('../util/path');
const {
  truncateString,
  truncateStringFront,
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

  it('zeroPad()', async () => {
    // padZero(7)    =>   "07"
    expect( zeroPad(7) ).toBe("07");
    expect( zeroPad(7) ).not.toBe("7");

    // padZero(7, 2) =>   "07"
    expect( zeroPad(7, 2) ).toBe("07");
    expect( zeroPad(7, 2) ).not.toBe("7");

    // padZero(7, 3) =>  "007
    expect( zeroPad(7, 3) ).toBe("007");
    expect( zeroPad(7, 3) ).not.toBe("07");
    expect( zeroPad(7, 3) ).not.toBe("7");
  });

  // ==============================================

  it('removeWhitespace()', async () => {
    // 'a b c d'    =>   "abcd"
    expect(removeWhitespace('a b c d') ).toBe("abcd");
    expect(removeWhitespace('a b c d') ).not.toBe("a b c d");

    // ' ab cd '    =>   "abcd"
    expect(removeWhitespace(' ab cd ') ).toBe("abcd");
    expect(removeWhitespace(' ab cd ') ).not.toBe(" ab cd ");
    expect(removeWhitespace(' ab cd ') ).not.toBe(" abcd ");
  });

  // ==============================================
});