export class stringUtils {
  public toUpperCase(str: string) {
    if (!str) {
      throw new Error("Invalid Argument!");
    }
    return str.toUpperCase();
  }
}

type stringInfo = {
  lowerCase: string;
  upperCase: string;
  characters: string[];
  length: number;
  extraInfo: object | undefined;
};

export function additionalStringInfo(str: string): stringInfo {
  return {
    lowerCase: str.toLowerCase(),
    upperCase: str.toUpperCase(),
    characters: Array.from(str),
    length: str.length,
    extraInfo: {},
  };
}
