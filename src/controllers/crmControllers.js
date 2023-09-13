import mongoose from "mongoose";
import { ContactSchema } from "../models/crmModel";

const Contact = mongoose.model('Contact', ContactSchema);

export const addNewContact = async (req, res) => {

    let newContact = new Contact(req.body);
    const saved = await newContact.save();
    res.json(saved);
}

export const getContacts = async (req, res) => {
    try {
        const contacts = await Contact.find();
        res.json(contacts);
    } catch (err) {
        res.status(400).send(err.message);
    }
}

export const getContact = async (req, res) => {
    try {
        const contact = await Contact.find({_id: req.params.contactId});
        res.json(contact);
    } catch (err) {
        res.status(400).send(err.message);
    }
}

export const updateContact = async (req, res) => {
    try {
        const updatedContact = await Contact.findOneAndUpdate({_id: req.params.contactId}, req.body, { new: true });
        res.json(updatedContact);
    } catch (err) {
        res.status(400).send(err.message);
    }
}

export const deleteContact = async (req, res) => {
    try {
        await Contact.findOneAndRemove({ _id: req.params.contactId });
        res.send('delete successful');
    } catch (err) {
        res.status(400).send(err.message);
    }
}