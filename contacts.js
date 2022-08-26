class Contact {
    constructor(fistNameOrObject, lastName, email) {
        if (typeof fistNameOrObject === 'object') {
            Object.assign(this, fistNameOrObject);
        } else {
            this.fistName = fistNameOrObject;
            this.lastName = lastName;
            this.email = email;
        }
    }
    toString() {
        return `${this.fistName} ${this.lastName} <${this.email}>`;
    }
}
let contacts = [
    new Contact('Alex', 'Kotov', 'alexko@in6k.com'),
    new Contact('Alex 2', 'Kotov', 'alexko@in6k.com'),
    new Contact('Bohdan', 'Kovalchuk', 'bodiako@in6k.com'),
    new Contact('Bohdan 2', 'Kovalchuk', 'bodiako@in6k.com')
]
const contactListElement = document.getElementById('contacts')
function appendContact(contact) {
    const { firstName, lastName, email} = contact;
    const contactElement = document.createElement('p');
    contactElement.innerText = `${firstName} ${lastName}`;
    if (email && email.length) {
        contactElement.innerHTML += `<a href="mailto:${email}">&lt;${email}&gt;</a>`;
    }
    contactListElement.appendChild(contactElement);
}

contacts.forEach(appendContact);

const contactForm = document.forms['contact'];

contactForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const formData = new FormData(contactForm);
    const contact = new Contact(Object.fromEntries(formData.entries()));
    contacts.push(contact);
    appendContact(contact);
    contactForm.reset();
}) 
