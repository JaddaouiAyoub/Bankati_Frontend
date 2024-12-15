export interface Agent {
  id?: number;
  uid?: string;
  lastname: string;
  firstname: string;
  email: string;
  password: string;
  numCin: string;
  address: string;
  phonenumber: string;
  description?: string;
  cinRectoPath?: ArrayBuffer; // ou 'Uint8Array' selon vos besoins
  cinVersoPath?: ArrayBuffer; // ou 'Uint8Array' selon vos besoins
  birthdate: string;
  numLicence?: number;
  numRegCom?: number;
  firstLogin: boolean;
  role: string; // Assurez-vous d'avoir un type approprié pour la propriété 'role'
}
