/* eslint-disable camelcase */
import {
  Column, CreateDateColumn, Entity, OneToMany, PrimaryColumn, UpdateDateColumn,
} from 'typeorm';
import { v4 as uuid } from 'uuid';
import OrdersProducts from '../../../orders/typeorm/entities/OrdersProducts';

@Entity('products')
class Product {
  @PrimaryColumn('uuid')
  id: string;

  @OneToMany(() => OrdersProducts, (order_products) => order_products.product)
  order_products: OrdersProducts[];

  @Column()
  name: string;

  @Column('decimal')
  price: number;

  @Column('int')
  quantity: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}

export default Product;
