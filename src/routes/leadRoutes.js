import express from "express";
import {
  createLead,
  getLeads,
  updateLead,
  deleteLead,
  
} from "../controllers/leadController.js";
import { authenticate } from "../middlewares/authMiddleware.js";

const router = express.Router();

// Protect all routes with authentication
router.use(authenticate);

// CRUD
router.post("/", createLead);
router.get("/", getLeads);
router.put("/:id", updateLead);
router.delete("/:id", deleteLead);

// Notes
// router.post("/:leadId/notes", addNote);

export default router;
