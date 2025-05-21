import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from "../database";

export type PrivateUserAttributes = {
  id: number;
  email: string;
  password: string;
};

interface PrivateUserCreateAttributes
  extends Optional<PrivateUserAttributes, "id"> {}

class PrivateUser
  extends Model<PrivateUserAttributes, PrivateUserCreateAttributes>
  implements PrivateUserAttributes
{
  public id!: number;
  public email!: string;
  public password!: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

PrivateUser.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    email: {
      type: DataTypes.STRING(255),
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    password: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
  },
  { tableName: "PrivateUsers", modelName: "PrivateUser", sequelize }
);

export default PrivateUser;
