import { sequelize } from "./database";
import "./Models/PrivateUser";
import "./Models/PublicUser";
import "./Models/Chat";
import "./Models/Message";
import "./Models/Like";

async function logDatabaseTables() {
  try {
    const queryInterface = sequelize.getQueryInterface();
    const tables = await queryInterface.showAllTables();
    console.log("Tables in the database:", tables);
  } catch (error) {
    console.error("Error fetching tables:", error);
  }
}

export const syncModels = async () => {
  try {
    await sequelize.sync({ force: false, alter: true });

    console.log("All models were synchronized successfully.");
  } catch (error) {
    console.error("Error syncing models:", error);
  }
  logDatabaseTables();
};
