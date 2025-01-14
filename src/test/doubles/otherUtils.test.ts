//import {
//calculateComplexity,
// toUpperCaseWithCf,
//} from "../../app/doubles/otherUtils";

import { utilForSpies } from "../../app/doubles/otherUtils";

describe.skip("OtherUtils test suite", () => {
  describe("utilForSpies test suite", () => {
    let sup: utilForSpies;
    beforeEach(() => {
      sup = new utilForSpies();
    });
    test("spy over toUpperCase", () => {
      const toUpperCaseSpy = jest.spyOn(sup, "toUpperCase");
      sup.toUpperCase("hari");
      expect(toUpperCaseSpy).toBeCalledWith("hari");
    });

    test("spy over console", () => {
      const consoleLogSpy = jest.spyOn(console, "log");
      sup.consoleLog("xyz");
      expect(consoleLogSpy).toBeCalledWith("xyz");
    });
  });

  //method 2: use jest mock functions
  //const jckf = jest.fn();
  //beforeEach(() => {
  // jest.clearAllMocks();
  //});
  //it("should return the correct output if there is no valid string", () => {
  //  const actual = toUpperCaseWithCf("", jckf);
  //  expect(actual).toBeUndefined;
  //  expect(jckf).toBeCalledWith("ivalid argumets");
  //  expect(jckf).toBeCalledTimes(1);
  //});
  //it("should return the correct uppercase string", () => {
  //  const actual = toUpperCaseWithCf("hari", jckf);
  //  expect(actual).toBe("HARI");
  //  expect(jckf).toBeCalledWith("passed to callack with arg value hari");
  //  expect(jckf).toBeCalledTimes(1);
  //});
  //method 1: write mock functions
  //let argArr: string[] = [];
  //let callcount = 0;
  //const ckf = function (str: string) {
  //  argArr.push(str);
  //  callcount++;
  //};
  //beforeEach(() => {
  //  argArr = [];
  //  callcount = 0;
  //});
  //xit("should return the correct output if there is no valid string", () => {
  //  const actual = toUpperCaseWithCf("", ckf);
  //  expect(actual).toBeUndefined;
  //  expect(argArr).toContain("ivalid argumets");
  //  expect(callcount).toBe(1);
  //});
  //xit("should return the correct uppercase string", () => {
  //  const actual = toUpperCaseWithCf("hari", ckf);
  //  expect(actual).toBe("HARI");
  // expect(argArr).toContain("passed to callack with arg value hari");
  // expect(callcount).toBe(1);
  //});
  // xit("should return the correct uppercase string", () => {
  //  const actual = toUpperCaseWithCf("hari", () => {});
  //  expect(callcount).toBe(1);
  //});
  //xit("Calculates Complexity", () => {
  //  const someInfo = {
  //    length: 5,
  //   extraInfo: {
  //     field1: "someInfo",
  //     field2: "someOtherInfo",
  //  },
  //  };
  //  const actual = calculateComplexity(someInfo as any);
  //  expect(actual).toBe(10);
  //});
});
