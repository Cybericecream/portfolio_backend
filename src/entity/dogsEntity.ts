// @/src/entity/dogsEntity.ts
import { Table, Model, Column, DataType } from "sequelize-typescript";

@Table({
  timestamps: false,
  tableName: "dogs",
})
export class Dog extends Model {
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  name!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  breed!: string;

  @Column({
    type: DataType.BOOLEAN,
    allowNull: true,
    defaultValue: true,
  })
  isGoodBoy!: boolean;

  @Column({
    type: DataType.BIGINT,
    allowNull: false,
  })
  createdTime: bigint;

  @Column({
    type: DataType.BIGINT,
    allowNull: true,
  })
  updatedTime: bigint;

  @Column({
    type: DataType.BIGINT,
    allowNull: true,
  })
  deletedTime: bigint;
}
