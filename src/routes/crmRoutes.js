import {
  addNewContact,
  getContacts,
  getContactWithID,
  updateContact,
  deleteContact,
} from "../controllers/crmController.js";
import {
  login,
  register,
  loginRequired,
} from "../controllers/userController.js";

const routes = (app) => {
  app
    .route("/contact")

    .get(
      (req, res, next) => {
        //middleware
        console.log(`Request from: ${req.originalUrl}`);
        console.log(`Request type : ${req.method}`);
        next();
      },
      loginRequired,
      getContacts,
    )

    .post(loginRequired,addNewContact); //post new contact

  app
    .route("/contact/:contactId") //get all contacts
    .get(loginRequired, getContactWithID) //get specific contact
    .put(loginRequired, updateContact) //update contact
    .delete(loginRequired, deleteContact); //delete contact

  // registration route  
  app
    .route('/auth/register')
    .post(register);

  //login route
  app
    .route('/login')
    .post(login);
};

export default routes;
