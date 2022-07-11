export class User {
    id!: number;
    age!: number;
    gender!: string;
    email!: string;
    phoneNumber!: string;
    userName!: string;
    password!: string;
    confirmPassword!: string;
    role!: string
  }


  export class Users {
    id! : number;
    age! : number;
    gender! : string;
    email! : string;
    phoneNumber! : string;
    userName! : string;
    role:string = "Customer";
}