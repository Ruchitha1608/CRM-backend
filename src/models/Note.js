import { DataTypes } from "sequelize";
import { sequelize } from "../config/db.js";
import { Lead } from "./Lead.js";

export const Note = sequelize.define("Note", {
  id: {
    type: DataTypes.UUID,
    autoIncrement: true,
    primaryKey: true,
  },
  body: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  authorId: {
    type: DataTypes.UUID,
    allowNull: false,
  },
  createdAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
});

// ✅ Associations with alias
Lead.hasMany(Note, { 
  foreignKey: "leadId", 
  as: "notes",   // <-- use lowercase "notes"
  onDelete: "CASCADE" 
});

Note.belongsTo(Lead, { 
  foreignKey: "leadId", 
  as: "lead"     // <-- matching alias for reverse relation
});
