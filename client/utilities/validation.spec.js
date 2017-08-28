import { validateEmail } from './validation';

describe('Validation Utilities', () => {
  it('should return true when validating a valid email', () => {
    const expected = true;

    const emailAddress = 'oshalygin@gmail.com';
    const actual = validateEmail(emailAddress);

    expect(actual).toEqual(expected);
  });

  it('should return true when validating an email with numbers', () => {
    const expected = true;

    const emailAddress = 'oshalygin12345@gmail.com';
    const actual = validateEmail(emailAddress);

    expect(actual).toEqual(expected);
  });

  it('should return true when validating an email with a top level domain', () => {
    const expected = true;

    const emailAddress = 'email@domain.co.jp';
    const actual = validateEmail(emailAddress);

    expect(actual).toEqual(expected);
  });

  it('should return false when validating a random string that doesnt look like an email', () => {
    const expected = false;

    const emailAddress = 'oshalygin';
    const actual = validateEmail(emailAddress);

    expect(actual).toEqual(expected);
  });

  it('should return false when validating a string with multiple @ symbols', () => {
    const expected = false;

    const emailAddress = 'email@domain@domain.com';
    const actual = validateEmail(emailAddress);

    expect(actual).toEqual(expected);
  });
});
