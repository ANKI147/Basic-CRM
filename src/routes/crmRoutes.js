import { addNewContact, getContacts, getContactById, updateContact, deleteContact } from "../controllers/crmcontrollers.js";

const routes = (app) => {
    app.route('/contact')
    .get((req, res, next) => {
        //middleware
        console.log(`Request from: ${req.originalUrl}`)
        console.log(`Request type: ${req.originalUrl}`)
        next(); 
    },getContacts)
    .post(addNewContact)
    .head((req, res) => {
        res.set('Allow', 'GET, POST, HEAD, OPTIONS').send();
    })
    .options((req, res) => {
        res.set('Allow', 'GET, POST, HEAD, OPTIONS').send();
    });

    app.route('/contact/:contactId')
    .get(getContactById)
    .put(updateContact)
    .patch(updateContact)
    .delete(deleteContact)
    .head((req, res) => {
        res.set('Allow', 'GET, PUT, PATCH, DELETE, HEAD, OPTIONS').send();
    })
    .options((req, res) => {
        res.set('Allow', 'GET, PUT, PATCH, DELETE, HEAD, OPTIONS').send();
    });
}

export default routes;