export class DiscordUser {
  id: number | undefined;
  name: string | undefined;
  email: string | undefined;
  password: string | undefined;

  constructor(id : number | undefined, name : string | undefined, email: string | undefined, password: string | undefined) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.password = password;
  }
}
