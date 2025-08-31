export class UserEntity {
  constructor(
    public id: string,
    public name: string,
    public lastName: string,
    public username: string,
    public email: string,
    public password: string,
    public role: string[],
    public img?: string,
    public isActive?: boolean,
    public createdAt?: Date,
    public updatedAt?: Date,
    public lastLogin?: Date
  ) {}
}
