import {
  AllowNull,
  AutoIncrement,
  Column,
  DataType,
  Index,
  Model,
  PrimaryKey,
  Table,
  Unique,
} from "sequelize-typescript";
@Table({modelName:'user'})
export  class User extends Model<User> {
  @Index
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  id: number;
  
  @Index
  @Unique
  @Column(DataType.STRING)
  phone:string
  
  @Index
  @Unique
  @Column(DataType.STRING)
  username:string

  @AllowNull
  @Column(DataType.STRING)
  realname:string

  @Column(DataType.STRING)
  password:string

  @AllowNull
  @Column(DataType.TEXT)
  salt:string

  @AllowNull
  @Column(DataType.JSON)
  roles:[]
}
