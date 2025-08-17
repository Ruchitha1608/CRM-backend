import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();

export const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: "postgres",
  logging: false,
});

export const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log("✅ Postgres connected successfully");

    await sequelize.sync({ alter: true });
    console.log("✅ Database synced (migrated)");

  } catch (error) {
    console.error("❌ Unable to connect to Postgres:", error);
    process.exit(1);
  }
};
