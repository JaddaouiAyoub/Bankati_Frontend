export interface ClientDTO {
  id: number;
  lastname: string;
  firstname: string;
  email: string;
  phonenumber: string;
  password: string;
  cinRectoPath: Uint8Array;
  cinVersoPath: Uint8Array;
  firstLogin: boolean;
  bankAccountDTO:BankAccountDTO;
}
export interface BankAccountDTO {
  id: number;
  accountNumber: number;
  accountType: string; // ou utilisez un enum si vous avez une liste fixe de types de compte
  balance: number;
  createdAt: Date;
  status: string; // ou utilisez un enum si vous avez une liste fixe de statuts
  //clientDTO: ClientDTO; // Assurez-vous que cette référence est correcte
}
