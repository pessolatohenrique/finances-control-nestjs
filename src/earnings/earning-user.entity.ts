import { UserEntity } from 'src/users/user.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { EarningEntity } from './earning.entity';
import { Exclude } from 'class-transformer';

@Entity('user_earning')
export class EarningToUserEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  earningId: string;

  @Column()
  @Exclude()
  userId: string;

  @Column()
  value: number;

  @Column()
  transaction_date: Date;

  @ManyToOne(() => EarningEntity, (earning) => earning.earningToUsers)
  earning: EarningEntity;

  @ManyToOne(() => UserEntity, (user) => user.earningToUsers)
  user: UserEntity;

  @CreateDateColumn({
    name: 'createdAt',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  createdAt: Date;

  @UpdateDateColumn({
    name: 'updatedAt',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  updatedAt: Date;

  @DeleteDateColumn({
    name: 'deletedAt',
    type: 'timestamp',
  })
  deletedAt: Date;
}
