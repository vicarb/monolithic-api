export class CustomerDTO {
    constructor(
      public email: string,
      public password: string,
      public firstName: string,
      public lastName: string,
      public dateOfBirth: Date
    ) {}
  }
  