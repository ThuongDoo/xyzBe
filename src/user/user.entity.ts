import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

export enum UserRole {
  ADMIN = 'admin',
  TRIAL = 'trial',
  STOCK1 = 'stock1',
  STOCK2 = 'stock2',
  STOCK3 = 'stock3',
  STOCK4 = 'stock4',
}

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column({ unique: true })
  phone: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column()
  name: string;

  @Column({ nullable: true })
  deviceInfo: string;

  @Column({ type: 'set', enum: UserRole, default: [UserRole.TRIAL] })
  roles: string;

  @Column({ type: 'date', nullable: true })
  expirationDate: Date;
}
