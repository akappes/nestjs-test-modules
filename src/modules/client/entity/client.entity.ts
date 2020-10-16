import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, Unique } from 'typeorm';

@Entity({name: 'clients'})
@Unique(['cnpj'])
export class Client implements ClientInterface {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column()
  name: string;

  @Column()
  cnpj: string;

  @Column()
  is_active: boolean;

  @CreateDateColumn()
  created_at: Date;

  @CreateDateColumn()
  updated_at: Date;
}

export interface ClientInterface {
  id: number
  name: string
  cnpj: string
  is_active: boolean
}