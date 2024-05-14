import { Column, Model, Table } from 'sequelize-typescript';

@Table
export class Testmd extends Model {
  @Column
  name: string;

  @Column({
    defaultValue: 'huhu',
  })
  pass: string;
}
