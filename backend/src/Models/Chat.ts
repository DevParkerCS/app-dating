import { Model, DataTypes, Optional } from "sequelize";
import { sequelize } from "../database";

interface ChatAttributes {
  id: number;
  user1Id: number;
  user2Id: number;
}

interface ChatCreationAttributes extends Optional<ChatAttributes, "id"> {}

export class Chat
  extends Model<ChatAttributes, ChatCreationAttributes>
  implements ChatAttributes
{
  public id!: number;
  public user1Id!: number;
  public user2Id!: number;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Chat.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    user1Id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "PublicUsers",
        key: "id",
      },
      onDelete: "CASCADE",
    },
    user2Id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "PublicUsers",
        key: "id",
      },
      onDelete: "CASCADE",
    },
  },
  {
    sequelize,
    tableName: "Chats",
    modelName: "Chat",
    timestamps: true,
  }
);

export default Chat;
