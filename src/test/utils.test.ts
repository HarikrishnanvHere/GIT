import { stringUtils } from "../app/utils";

describe("utils test suite", () => {
  describe("stringUtils class testing", () => {
    let stringClass: stringUtils;
    beforeEach(() => {
      stringClass = new stringUtils();
    });

    // it("should return the correct upper case string as output", () => {
    //   const actual = stringClass.toUpperCase("Hari");
    //   expect(actual).toBe("HARI");
    // });

    it("should return the correct message if error is thrown :- error detection using function", () => {
      function errorCheck() {
        const actual = stringClass.toUpperCase("");
      }
      expect(errorCheck).toThrow();
    });

    it("should return the correct message if error is thrown :- error detection using arrow function", () => {
      expect(() => {
        const actual = stringClass.toUpperCase("");
      }).toThrow();
    });

    it("should detect if error is not thrown: try and catch", (done) => {
      try {
        const actual = stringClass.toUpperCase("");
        done("detect if error is not thrown");
      } catch (error) {
        expect(error).toBeInstanceOf(Error);
        //expect(error).toHaveProperty("message", "Invalid Argument!");
      }
    });

    // it("should return the correct uppercase output", () => {
    //   const actual = stringClass.toUpperCase("Hari");
    //   expect(actual).toBe("HARI");
    // });
    // it("should return the correct uppercase output", () => {
    //   const actual = stringClass.toUpperCase("abc");
    //   expect(actual).toBe("ABC");
    // });
  });
});
