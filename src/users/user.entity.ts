import { EarningToUserEntity } from 'src/earnings/earning-user.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  Unique,
  UpdateDateColumn,
} from 'typeorm';

@Entity('users')
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  @Unique('unique_username', ['username'])
  username: string;

  @Column()
  @Unique('unique_email', ['email'])
  email: string;

  @Column()
  role: string;

  @Column()
  password: string;

  @OneToMany(() => EarningToUserEntity, (earningToUser) => earningToUser.user)
  earningToUsers: EarningToUserEntity[];

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
