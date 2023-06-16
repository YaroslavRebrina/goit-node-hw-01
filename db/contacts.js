const fs = require("fs/promises");
const path = require("path");
const { nanoid } = require("nanoid");

const contactsPath = path.join(__dirname, "contacts.json");

async function listContacts() {
  const contacts = await fs.readFile(contactsPath, "utf-8");
  return JSON.parse(contacts);
}

async function getContactById(id) {
  const contacts = await listContacts();
  return contacts.find((item) => item.id === id) || null;
}

async function removeContact(id) {
  const contacts = await listContacts();
  const contactToRemove = contacts.findIndex((item) => item.id === id);
  if (contactToRemove === -1) {
    return null;
  }
  const result = contacts.splice(contactToRemove, 1);
  fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return result;
}

async function addContact({ name, email, phone }) {
  // ...твій код. Повертає об'єкт доданого контакту.
  const contacts = await listContacts();
  const contactToAdd = { id: nanoid(), name, email, phone };
  contacts.push(contactToAdd);
  fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return contactToAdd;
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
