export enum passwordErrors {
  SHORT = "string is too short",
  NO_LOWER_CASE = "string as no lowercase letters",
  NO_UPPER_CASE = "string has no uppercase letters",
  NO_NUMBER = "string has no number",
}

export interface checkerOutput {
  valid: boolean;
  reasons: passwordErrors[];
}

export class PasswordChecker {
  public checkPassword(str: string): checkerOutput {
    const reasons: passwordErrors[] = [];
    this.isShort(str, reasons);
    this.hasLowerCase(str, reasons);
    this.hasUpperCase(str, reasons);

    return {
      valid: reasons.length > 0 ? false : true,
      reasons: reasons,
    };
  }

  public checkAdminPassword(str: string): checkerOutput {
    const basicCheck = this.checkPassword(str);
    const adminCheck: passwordErrors[] = this.hasNumber(
      str,
      basicCheck.reasons
    );
    return {
      valid: adminCheck.length > 0 ? false : true,
      reasons: adminCheck,
    };
  }

  private isShort(str: string, reasons: passwordErrors[]) {
    if (str.length < 8) {
      reasons.push(passwordErrors.SHORT);
    }
  }

  private hasUpperCase(str: string, reasons: passwordErrors[]) {
    if (str.toLowerCase() === str) {
      reasons.push(passwordErrors.NO_UPPER_CASE);
    }
  }

  private hasLowerCase(str: string, reasons: passwordErrors[]) {
    if (str.toUpperCase() === str) {
      reasons.push(passwordErrors.NO_LOWER_CASE);
    }
  }

  private hasNumber(str: string, reasons: passwordErrors[]) {
    const hasNUmber = /\d/;
    if (!hasNUmber.test(str)) {
      reasons.push(passwordErrors.NO_NUMBER);
    }
    return reasons;
  }
}
