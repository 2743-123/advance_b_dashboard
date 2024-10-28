import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/database';  // ensure correct database import

class Users extends Model {
  public id!: number;
  public firstName!: string;
  public lastName!: string;
  public email!: string;
  public password!: string;
  public role!: string;
}

Users.init({
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
    autoIncrement: true,
  },
  firstName: DataTypes.STRING,
  lastName: DataTypes.STRING,
  email: DataTypes.STRING,
  password: DataTypes.STRING,
  role: DataTypes.STRING,
}, { sequelize, modelName: 'Users' });
export default Users;
