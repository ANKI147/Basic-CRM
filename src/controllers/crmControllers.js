import mongoose from "mongoose";
import { ContactSchema } from "../modules/crmModules.js";

const Contact = mongoose.model("Contact", ContactSchema);

// POST /contact — Create a new contact
export const addNewContact = async (req, res) => {
  try {
    const { firstname, lastname, email, phone, company } = req.body;

    // Basic input validation
    if (!firstname || !email) {
      return res.status(400).json({ message: "firstname and email are required." });
    }

    const newContact = new Contact({ firstname, lastname, email, phone, company });
    const savedContact = await newContact.save();

    return res.status(201).json(savedContact);
  } catch (err) {
    if (err.name === "ValidationError") {
      return res.status(400).json({ message: "Validation error", details: err.message });
    }
    console.error("addNewContact error:", err);
    return res.status(500).json({ message: "Internal server error" });
  }
};

// GET /contacts — Retrieve all contacts with optional pagination
export const getContacts = async (req, res) => {
  try {
    const page = Math.max(1, parseInt(req.query.page) || 1);
    const limit = Math.min(100, Math.max(1, parseInt(req.query.limit) || 20));
    const skip = (page - 1) * limit;

    const [contacts, total] = await Promise.all([
      Contact.find({}).skip(skip).limit(limit).lean(),
      Contact.countDocuments(),
    ]);

    return res.status(200).json({
      data: contacts,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (err) {
    console.error("getContacts error:", err);
    return res.status(500).json({ message: "Internal server error" });
  }
};


export const getContactById = async (req, res) => {
  try {
    const contactId = req.params.contactId;
    const contact = await Contact.findById(contactId).lean();

    if (!contact) {
      return res.status(404).json({ message: "Contact not found" });
    }

    return res.status(200).json(contact);
  } catch (err) {
    console.error("getContactById error:", err);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const updateContact = async (req, res) => {
  try {
    const contactId = req.params.contactId;
    const updateData = req.body;

    const updatedContact = await Contact.findByIdAndUpdate(contactId, updateData, { new: true, runValidators: true }).lean();

    if (!updatedContact) {
      return res.status(404).json({ message: "Contact not found" });
    }

    return res.status(200).json(updatedContact);
  } catch (err) {
    if (err.name === "ValidationError") {
      return res.status(400).json({ message: "Validation error", details: err.message });
    }
    console.error("updateContact error:", err);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const deleteContact = async (req, res) => {
  try {
    const contactId = req.params.contactId;
    const deletedContact = await Contact.findByIdAndDelete(contactId).lean();

    if (!deletedContact) {
      return res.status(404).json({ message: "Contact not found" });
    }

    return res.status(200).json({ message: "Contact deleted successfully" });
  } catch (err) {
    console.error("deleteContact error:", err);
    return res.status(500).json({ message: "Internal server error" });
  }
};

