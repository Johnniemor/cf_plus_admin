export interface IUnit {
  _id: string;
  warehouse_id: string;
  name: string;
  amount: number;
  description: string;
  created_at: Date;
  deleted_at: Date;
}
