import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, BeforeInsert, Unique } from 'typeorm';
import { hash } from 'bcrypt';
import { IsEmail, Min, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';

@Entity({name: 'users'})
@Unique(['email'])
export class User implements UserInterface {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column()
  name: string;

  @Column()
  @IsEmail()
  email: string;

  @Column()
  @MinLength(6)
  @Min(6)
  @Exclude()
  password: string;

  @Column()
  is_active: boolean;

  @CreateDateColumn()
  created_at: Date;

  @CreateDateColumn()
  updated_at: Date;

  @Column()
  client_id: string;

  // @ManyToOne(() => Client)
  // @JoinColumn({ name: 'client_id' })
  // client: Client;

  @BeforeInsert()
  async hashPassword(): Promise<void> {
    this.password = await hash(this.password, 10);
  }

  constructor(partial: Partial<User>) {
     Object.assign(this, partial);
  }
}

export interface UserInterface {
  id: number
  name: string
  email: string
  password: string
  is_active: boolean
}