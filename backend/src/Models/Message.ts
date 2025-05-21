import { DataTypes, Model } from "sequelize";
import { sequelize } from "../database";

interface MessageAttributes {
  id: number;
  chatId: number;
  senderId: number;
  text: string;
  sentAt: Date;
}

interface MessageCreationAttributes extends Omit<MessageAttributes, "id"> {}

export class Message
  extends Model<MessageAttributes, MessageCreationAttributes>
  implements MessageAttributes
{
  public id!: number;
  public chatId!: number;
  public senderId!: number;
  public text!: string;
  public sentAt!: Date;
}

Message.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    chatId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: "Chats", key: "id" },
      onDelete: "CASCADE",
    },
    senderId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: "PublicUsers", key: "id" },
      onDelete: "CASCADE",
    },
    text: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    sentAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    sequelize,
    modelName: "Message",
    tableName: "Messages",
    timestamps: false,
  }
);

export default Message;
