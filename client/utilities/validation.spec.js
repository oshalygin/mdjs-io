import { validateEmail, validatePhoneNumber } from './validation';

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

  it('should return false when validating an email string with multiple @ symbols', () => {
    const expected = false;

    const emailAddress = 'email@domain@domain.com';
    const actual = validateEmail(emailAddress);

    expect(actual).toEqual(expected);
  });

  it('should return false when validating a string that does not match the US phone number format', () => {
    const expected = false;

    const emailAddress = 'email@domain@domain.com';
    const actual = validatePhoneNumber(emailAddress);

    expect(actual).toEqual(expected);
  });

  it('should return true when validating a US phone number without dashes', () => {
    const expected = true;

    const emailAddress = '1234567890';
    const actual = validatePhoneNumber(emailAddress);

    expect(actual).toEqual(expected);
  });

  it('should return true when validating a US phone number with dashes', () => {
    const expected = true;

    const emailAddress = '123-456-7890';
    const actual = validatePhoneNumber(emailAddress);

    expect(actual).toEqual(expected);
  });

  it('should return true when validating a US phone number with parens', () => {
    const expected = true;

    const emailAddress = '(123)-456-7890';
    const actual = validatePhoneNumber(emailAddress);

    expect(actual).toEqual(expected);
  });

  it('should return false when validating a US phone number with prepended 1', () => {
    const expected = false;

    const emailAddress = '1-(123)-456-7890';
    const actual = validatePhoneNumber(emailAddress);

    expect(actual).toEqual(expected);
  });

  it('should return false when validating a US phone number with improper parens', () => {
    const expected = false;

    const emailAddress = '(123(-456-7890';
    const actual = validatePhoneNumber(emailAddress);

    expect(actual).toEqual(expected);
  });
});
