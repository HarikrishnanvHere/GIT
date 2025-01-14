export class utilForSpies {
  private dummy() {}
  public toUpperCase(str: string) {
    return str.toUpperCase();
  }
  public consoleLog(str: string) {
    console.log(str);
  }
}

import { v4 } from "uuid";

export type stringInfo = {
  lowerCase: string;
  upperCase: string;
  characters: string[];
  length: number;
  extraInfo: object | undefined;
};

export function toUpperCase(arg: string) {
  return arg.toUpperCase();
}

export function toLowerCaseWithId(arg: string) {
  return arg.toLowerCase() + v4();
}

export function calculateComplexity(stringInfo: stringInfo) {
  return Object.keys(stringInfo).length * stringInfo.length;
}

type callackFn = (str: string) => void;

export function toUpperCaseWithCf(str: string, cf: callackFn) {
  if (!str) {
    cf("ivalid argumets");
    return;
  }
  cf(`passed to callack with arg value ${str}`);
  return str.toUpperCase();
}
