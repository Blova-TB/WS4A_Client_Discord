export class DiscordUser {
  id: number | undefined;
  login: string | undefined;
  email: string | undefined;
  pwd: string | undefined;

  constructor(id : number | undefined, name : string | undefined, email: string | undefined, password: string | undefined) {
    this.id = id;
    this.login = name;
    this.email = email;
    this.pwd = password;
  }
}
