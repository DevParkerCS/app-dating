import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from "../database";

type GeoPoint = {
  type: "Point";
  coordinates: [number, number]; // [Longitude, Latitude]
};

type Prompt = {
  title: string;
  text: string;
};

type InterestedIn = {
  minAge: number;
  maxAge: number;
  maxDistance: number;
  genders: string[];
};

export type PublicUserAttributes = {
  id: number;
  privateId: number;
  firstName: string | null;
  lastName: string | null;
  dob: Date | null;
  gender: string | null;
  interestedIn: InterestedIn;
  curLikes: number | null;
  location: GeoPoint | null;
  imageUrls: string[];
  prompts: Prompt[];
  is_profile_complete: boolean;
};

interface PublicUserCreationAttributes
  extends Optional<PublicUserAttributes, "id"> {}

class PublicUser
  extends Model<PublicUserAttributes, PublicUserCreationAttributes>
  implements PublicUserAttributes
{
  public id!: number;
  public privateId!: number;
  public firstName!: string;
  public lastName!: string;
  public dob!: Date;
  public gender!: string;
  public interestedIn!: InterestedIn;
  public curLikes!: number;
  public location!: GeoPoint;
  public imageUrls!: string[];
  public prompts!: Prompt[];
  public is_profile_complete!: boolean;
}

console.log("Inhere!");

PublicUser.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    firstName: {
      type: DataTypes.STRING(50),
      allowNull: true,
    },
    lastName: {
      type: DataTypes.STRING(50),
      allowNull: true,
    },
    dob: {
      type: DataTypes.DATEONLY,
      allowNull: true,
    },
    curLikes: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0,
    },
    location: {
      type: DataTypes.GEOGRAPHY("POINT", 4326),
      allowNull: true,
    },
    gender: {
      type: DataTypes.STRING(50),
      allowNull: true,
    },
    interestedIn: {
      type: DataTypes.JSONB,
      defaultValue: {},
    },
    imageUrls: {
      type: DataTypes.JSONB,
      defaultValue: [],
    },
    prompts: {
      type: DataTypes.JSONB,
      defaultValue: [],
    },
    privateId: {
      type: DataTypes.INTEGER,
      references: { model: "PrivateUsers", key: "id" },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    },
    is_profile_complete: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  },
  {
    sequelize,
    tableName: "PublicUsers",
    modelName: "PublicUser",
  }
);

export default PublicUser;
