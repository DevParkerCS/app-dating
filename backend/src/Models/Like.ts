import { Model, DataTypes, CreationOptional, ForeignKey } from "sequelize";
import { sequelize } from "../database";

interface LikeAttributes {
  id: number;
  sentUserId: number;
  likedUserId: number;
  createdAt: Date;
}

interface LikeCreationAttributes extends Omit<LikeAttributes, "id"> {}

export class Like
  extends Model<LikeAttributes, LikeCreationAttributes>
  implements LikeAttributes
{
  id!: number;
  sentUserId!: number;
  likedUserId!: number;
  createdAt!: Date;
}

Like.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    sentUserId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "PublicUsers",
        key: "id",
      },
      onDelete: "CASCADE",
    },
    likedUserId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "PublicUsers",
        key: "id",
      },
      onDelete: "CASCADE",
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    sequelize,
    tableName: "Likes",
    modelName: "Like",
    timestamps: false,
    indexes: [
      {
        unique: true,
        fields: ["sentUserId", "likedUserId"],
      },
    ],
  }
);

export default Like;
