import express from "express";
import {
  addNote,
  getNotesByLead,
  updateNote,
  deleteNote,
} from "../controllers/noteController.js";
import { authenticate } from "../middlewares/authMiddleware.js";

const router = express.Router();

// Add note to a lead
router.post("/:leadId/notes", authenticate, addNote);

// Get all notes for a lead
router.get("/:leadId/notes", authenticate, getNotesByLead);

// Update a specific note
router.put("/:leadId/notes/:noteId", authenticate, updateNote);

// Delete a specific note
router.delete("/:leadId/notes/:noteId", authenticate, deleteNote);

export default router;
