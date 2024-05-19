import { UserEntity } from 'src/users/user.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { EarningEntity } from './earning.entity';

@Entity('user_earning')
export class EarningToUserEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  earningId: string;

  @Column()
  userId: string;

  @Column()
  value: number;

  @Column()
  transaction_date: Date;

  @ManyToOne(() => EarningEntity, (earning) => earning.earningToUsers)
  earning: EarningEntity;

  @ManyToOne(() => UserEntity, (user) => user.earningToUsers)
  user: UserEntity;
}
