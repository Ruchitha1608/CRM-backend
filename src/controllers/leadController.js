import { Lead } from "../models/Lead.js";
import { Note } from "../models/Note.js";
import { getBadge } from "../services/badgeService.js";
import { Op } from "sequelize";

// ✅ Create a Lead
export const createLead = async (req, res) => {
  try {
    const lead = await Lead.create({
      ...req.body,
      userId: req.user.id, // automatically attach logged-in user
    });
    res.json(lead);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// ✅ Get Leads with filters & badge
export const getLeads = async (req, res) => {
  try {
    const { status, dueToday } = req.query;
    const where = { userId: req.user.id }; // fetch only current user's leads

    if (status) where.status = status;

    if (dueToday === "true") {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const tomorrow = new Date(today);
      tomorrow.setDate(today.getDate() + 1);
      where.nextFollowUp = { [Op.gte]: today, [Op.lt]: tomorrow };
    }

    const leads = await Lead.findAll({
      where,
      include: [{ model: Note, as: "notes" }],
      order: [["nextFollowUp", "ASC"]],
    });

    const response = leads.map((lead) => ({
      ...lead.toJSON(),
      badge: getBadge(lead),
    }));

    res.json(response);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// ✅ Update Lead
export const updateLead = async (req, res) => {
  try {
    const { id } = req.params;
    const [updated] = await Lead.update(req.body, {
      where: { id, userId: req.user.id },
    });

    if (!updated) return res.status(404).json({ error: "Lead not found" });

    const updatedLead = await Lead.findByPk(id, {
      include: [{ model: Note, as: "notes" }],
    });
    res.json(updatedLead);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// ✅ Delete Lead
export const deleteLead = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Lead.destroy({ where: { id, userId: req.user.id } });
    if (!deleted) return res.status(404).json({ error: "Lead not found" });

    res.json({ message: "Lead deleted" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
