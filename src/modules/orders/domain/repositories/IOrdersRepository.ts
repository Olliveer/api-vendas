import { ICreateOrder } from '../Models/ICreateOrder';
import { IOrder } from '../Models/IOrder';
import { IOrderPaginate } from '../Models/IOrderPaginate';

export interface IOrdersRepository {
  findById(id: string): Promise<IOrder | undefined>;
  findAllPaginate(): Promise<IOrderPaginate>;
  create(data: ICreateOrder): Promise<IOrder>;
}
