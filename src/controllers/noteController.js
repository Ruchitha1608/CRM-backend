import { Lead } from "../models/Lead.js";
import { Note } from "../models/Note.js";

// Add a note to a lead
export const addNote = async (req, res) => {
  try {
    const { leadId } = req.params;
    const { body } = req.body;

    // ensure lead exists
const lead = await Lead.findOne({
  where: { id: leadId  }
});
    if (!lead) return res.status(404).json({ error: "Lead not found" });

    const note = await Note.create({
      leadId,
      authorId: req.user.id, // comes from auth middleware
      body,
      createdAt: new Date(),
    });

    res.status(201).json(note);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get all notes for a lead
export const getNotesByLead = async (req, res) => {
  try {
    const { leadId } = req.params;

    const notes = await Note.findAll({
      where: { leadId },
      order: [["createdAt", "DESC"]],
    });

    res.json(notes);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update a specific note
export const updateNote = async (req, res) => {
  try {
    const { leadId, noteId } = req.params;
    const { body } = req.body;

    const note = await Note.findOne({ where: { id: noteId, leadId } });
    if (!note) return res.status(404).json({ error: "Note not found" });

    // only author can update
    if (note.authorId !== req.user.id)
      return res.status(403).json({ error: "Not allowed" });

    note.body = body || note.body;
    await note.save();

    res.json(note);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete a specific note
export const deleteNote = async (req, res) => {
  try {
    const { leadId, noteId } = req.params;

    const note = await Note.findOne({ where: { id: noteId, leadId } });
    if (!note) return res.status(404).json({ error: "Note not found" });

    if (note.authorId !== req.user.id)
      return res.status(403).json({ error: "Not allowed" });

    await note.destroy();
    res.json({ message: "Note deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
