import PublicUser from "./PublicUser";
import PrivateUser from "./PrivateUser";

PrivateUser.hasOne(PublicUser, {
  foreignKey: {
    name: "privateId",
    allowNull: true,
  },
  as: "publicUser",
});

PublicUser.belongsTo(PrivateUser, {
  foreignKey: {
    name: "privateId",
    allowNull: true,
  },
  as: "privateUser",
});

export default { PublicUser, PrivateUser };
