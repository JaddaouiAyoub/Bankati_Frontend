export interface AccountOperationDTO {
  id: number;
  operationDate: Date;
  amount: number;
  type: string;
  bankAccountId: number;
  description: string;
}
