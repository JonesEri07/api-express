import { addNewContact, deleteContact, getContact, getContacts, updateContact } from "../controllers/crmControllers";
import { login, loginRequired, register } from "../controllers/userControllers";

const routes =  (app) => {
    app.route('/contacts')
    .get(loginRequired, getContacts)
    .post(loginRequired, addNewContact);

    app.route('/contacts/:contactId')
    .get(loginRequired, getContact)
    .put(loginRequired, updateContact)
    .delete(loginRequired, deleteContact);

    app.route('/auth/register')
    .post(register);

    app.route('/login')
    .post(login);
}

export default routes;