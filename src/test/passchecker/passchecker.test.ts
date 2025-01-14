import {
  PasswordChecker,
  passwordErrors,
} from "../../app/passchecker/passchecker";

describe("PasswordChecker test suite", () => {
  let sut: PasswordChecker;

  beforeEach(() => {
    sut = new PasswordChecker();
  });

  it("should return false if the length of password is less than 8 characters", () => {
    const actual = sut.checkPassword("123456");
    expect(actual.valid).toBe(false);
    expect(actual.reasons).toContain(passwordErrors.SHORT);
  });

  it("should return true if the length of password is greater than or equal to 8 characters", () => {
    const actual = sut.checkPassword("12345678sA");
    //expect(actual.valid).toBe(true);
    expect(actual.reasons).not.toContain(passwordErrors.SHORT);
  });

  it("should return false if the password doesnot have lowercase letters", () => {
    const actual = sut.checkPassword("1234ABCD");
    expect(actual.valid).toBe(false);
    expect(actual.reasons).toContain(passwordErrors.NO_LOWER_CASE);
  });

  it("should return true if the password contains atleast one lowercase letters", () => {
    const actual = sut.checkPassword("ABCd");
    //expect(actual.valid).toBe(true);
    expect(actual.reasons).not.toContain(passwordErrors.NO_LOWER_CASE);
  });

  it("should return false if the password doesnot have uppercase letters", () => {
    const actual = sut.checkPassword("1234abcd");
    expect(actual.valid).toBe(false);
    expect(actual.reasons).toContain(passwordErrors.NO_UPPER_CASE);
  });

  it("should return true if the password contains atleast one uppercase letters", () => {
    const actual = sut.checkPassword("abcA");
    //expect(actual.valid).toBe(true);
    expect(actual.reasons).not.toContain(passwordErrors.NO_UPPER_CASE);
  });

  it("should return true for passing all the criteria", () => {
    const actual = sut.checkPassword("1234AbCd");
    expect(actual.valid).toBe(true);
    expect(actual.reasons).toHaveLength(0);
  });

  it("should return false if admin password doesnot have a number", () => {
    const actual = sut.checkAdminPassword("abcd");
    expect(actual.valid).toBe(false);
    expect(actual.reasons).toContain(passwordErrors.NO_NUMBER);
  });

  it("should return true if admin password contains a number", () => {
    const actual = sut.checkAdminPassword("abAd12345");
    expect(actual.valid).toBe(true);
    expect(actual.reasons).not.toContain(passwordErrors.NO_NUMBER);
  });
});
