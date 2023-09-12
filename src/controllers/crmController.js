import mongoose from "mongoose";
import { ContactSchema } from "../models/crmModel";

const Contact = mongoose.model('Contact', ContactSchema);

export const addNewContact = async (req, res) => {

    let newContact = new Contact(req.body);
    const saved = await newContact.save();
    res.send(saved);
}