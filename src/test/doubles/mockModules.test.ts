jest.mock("../../app/doubles/otherUtils", () => ({
  ...jest.requireActual("../../app/doubles/otherUtils"),
  calculateComplexity: () => {
    return 10;
  },
}));

jest.mock("uuid", () => ({
  v4: () => {
    return "123";
  },
}));

import * as otherUtils from "../../app/doubles/otherUtils";

describe("module tests", () => {
  test("calculate complexity", () => {
    const result = otherUtils.calculateComplexity({} as any);
    expect(result).toBe(10);
  });

  test("toUppercase", () => {
    const actual = otherUtils.toUpperCase("abc");
    expect(actual).toBe("ABC");
  });

  test("toLowerCaseWithId", () => {
    const actual = otherUtils.toLowerCaseWithId("ABC");
    expect(actual).toBe("abc123");
  });
});
