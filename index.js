const contactsApi = require("./db/contacts");
const { Command } = require("commander");

const invokeAction = async ({ action, id, name, email, phone }) => {
  switch (action) {
    case "getAll":
      const contacts = await contactsApi.listContacts();
      console.table(contacts);
      break;
    case "getById":
      const contact = await contactsApi.getContactById(id);
      console.log(contact);
      break;
    case "deleteContactById":
      const deletedContact = await contactsApi.removeContact(id);
      console.log(deletedContact);
      break;
    case "add":
      const addedContact = await contactsApi.addContact({
        name,
        email,
        phone,
      });
      console.log(addedContact);
      break;
    default:
      console.log("Unknown action");
      break;
  }
};

const program = new Command();
program
  .option("-a, --action <type>", "action name")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type> ", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse(process.argv);

const argv = program.opts();

invokeAction(argv);
