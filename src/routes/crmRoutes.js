import { addNewContact, deleteContact, getContact, getContacts, updateContact } from "../controllers/crmController";

const routes =  (app) => {
    app.route('/contacts')
    .get(getContacts)
    .post(addNewContact);

    app.route('/contacts/:contactId')
    .get(getContact)
    .put(updateContact)
    .delete(deleteContact);
}

export default routes;