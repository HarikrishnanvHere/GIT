export class userModel {
  public id: number;
  public name: string;
  public email: string;
  public password: String;

  constructor(id: number, name: string, email: string, password: string) {
    this.id = id;
    this.password = password;
    this.name = name;
    this.email = email;
  }
}
