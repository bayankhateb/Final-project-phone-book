'use strict'; 

// Array of contact objects with default sample data
let contacts = [
  {
    name: "dror",
    phone: "423443243",
    address: "tel-aviv",
    age: "19",
    email: "dror20@gmail.com",
    src: "https://play-lh.googleusercontent.com/vco-LT_M58j9DIAxlS1Cv9uvzbRhB6cYIZJS7ocZksWRqoEPat_QXb6fVFi77lciJZQ=w526-h296-rw"
  },
  {
    name: "lior",
    phone: "4334642312",
    address: "tel-aviv",
    age: "20",
    email: "lior19@gmail.com",
    src: "./img/arick.jpeg"
  },
  {
    name: "bayan",
    phone: "0559180977",
    address: "tamra",
    age: "40",
    email: "khatebbayan19@gmail.com",
    src: "/img/tawfek.jpeg"
  },
  {
    name: "amer",
    phone: "0556645417",
    address: "Nazareth",
    age: "35",
    email: "amer19@gmail.com",
    src: "/img/tomas.jpeg"
  }
];

// Grabbing references to important DOM elements
const container = document.querySelector(".container"); // Main container
const contactTemplate = document.querySelector(".contact.template"); // Template for cloning contact cards
const searchInput = document.getElementById("search"); // Search input field
const editModal = document.getElementById("editModal"); // Modal for adding/editing
const closeModal = document.getElementById("closeModal"); // Close button for edit modal
const infoModal = document.getElementById("infoModal"); // Info modal for contact details
const infoContent = document.getElementById("infoContent"); // Where the info content is inserted
const closeInfoModal = document.getElementById("closeInfoModal"); // Close button for info modal
const addUserBtn = document.querySelector('button[title="Add User"]'); // Add User button
const deleteAllBtn = document.querySelector('button[title="Delete All"]'); // Delete All button
const form = editModal.querySelector("form"); // The form inside the modal
const submitBtn = document.getElementById("submit"); // Save button

let editingIndex = null; // Tracks which contact is being edited (null means new contact)

// Updates the number of contacts displayed on screen
function updateContactCount(count) {
  const countElement = document.getElementById("contactCount");
  countElement.textContent = `${count} contact${count === 1 ? '' : 's'}`;
}

// Renders the list of contacts on the page
function renderContacts(list) {
list.sort((a, b) => a.name.localeCompare(b.name)); // Always sort alphabetically

  // Remove all existing contact cards (except the hidden template)
  document.querySelectorAll(".contact:not(.template)").forEach(c => c.remove());

  // Loop through each contact and create a card
  list.forEach((contact, index) => {
    const card = contactTemplate.cloneNode(true); // Clone the template
    card.classList.remove("template");
    card.style.display = "flex"; // Show the card

    // Set the contact image or fallback
    const img = card.querySelector("img");
    img.src = contact.src && contact.src.trim() !== "" ? contact.src : "img/d3b1c094-7d0d-4665-997c-83206e76f1a3.png";
    img.alt = contact.name;
    img.onerror = () => { // Fallback image if loading fails
      img.src = "img/d3b1c094-7d0d-4665-997c-83206e76f1a3.png";
    };

    card.querySelector("span").textContent = contact.name; // Set name on card

    // Set up Info button - shows contact info in modal
    card.querySelector('[title="Info"]').onclick = () => {
      infoContent.innerHTML = `
        <h2>Contact Info</h2>
        <p><strong>Name:</strong> ${contact.name}</p>
        <p><strong>Phone:</strong> ${contact.phone}</p>
        <p><strong>Address:</strong> ${contact.address}</p>
        <p><strong>Age:</strong> ${contact.age || 'N/A'}</p>
        <p><strong>Email:</strong> ${contact.email}</p>
      `;
      infoModal.classList.remove("hidden");
    };

    // Set up Edit button - pre-fill form and open modal
    card.querySelector('[title="Edit"]').onclick = () => {
      editingIndex = index;
      const inputs = form.querySelectorAll("input");
      inputs[0].value = contact.name;
      inputs[1].value = contact.phone;
      inputs[2].value = contact.address;
      inputs[3].value = contact.age || '';
      inputs[4].value = contact.email || '';
      inputs[5].value = contact.src;

      editModal.classList.remove("hidden");
    };

    // alert massege before delet
card.querySelector('[title="Delete"]').onclick = () => {
  const confirmDelete = confirm(`Are you sure you want to delete "${contact.name}"?`);
  if (confirmDelete) {
    contacts.splice(index, 1); // Remove from array
    renderContacts(contacts); // Refresh the list
  }
};


    container.appendChild(card); // Add card to the page
  });

  updateContactCount(list.length); // Update count display
}

// Filter contacts as user types in the search field
searchInput.addEventListener("input", () => {
  const val = searchInput.value.toLowerCase(); // Get lowercase search term
  const filtered = contacts.filter(c => c.name.toLowerCase().includes(val)); // Filter by name
  renderContacts(filtered); // Show filtered list
});

// Add User button click - shows empty form for new contact
addUserBtn.addEventListener("click", () => {
  editingIndex = null; // No existing contact is being edited
  form.reset(); // Clear form fields
  editModal.classList.remove("hidden"); // Show modal
});

// Delete All button click - confirms and clears contacts
deleteAllBtn.addEventListener("click", () => {
  if (confirm("Delete all contacts?")) {
    contacts = []; // Clear array
    renderContacts(contacts); // Refresh UI
  }
});

// Close the edit modal (× button)
closeModal.addEventListener("click", () => {
  editModal.classList.add("hidden");
});

// Handle form submission for adding or updating contact
form.addEventListener("submit", (e) => {
  e.preventDefault(); // Prevent default form behavior

  const inputs = form.querySelectorAll("input"); // Grab all input fields

  // Create new contact object from input values
  const newContact = {
    name: inputs[0].value,
    phone: inputs[1].value,
    address: inputs[2].value,
    age: inputs[3].value,
    email: inputs[4].value || 'N/A',
    src: inputs[5].value || "img/d3b1c094-7d0d-4665-997c-83206e76f1a3.png"
  };

  // Update existing contact or add a new one
  if (editingIndex !== null) {
    contacts[editingIndex] = newContact;
  } else {
    contacts.push(newContact);
  }

  // Always sort alphabetically after adding/editing
contacts.sort((a, b) => a.name.localeCompare(b.name));

editModal.classList.add("hidden"); // Close modal
renderContacts(contacts); // Refresh contact list

  editModal.classList.add("hidden"); // Close modal
  renderContacts(contacts); // Refresh contact list
});

// Initial render of contacts when the page loads
renderContacts(contacts);

// Close the info modal (× button)
closeInfoModal.addEventListener("click", () => {
  infoModal.classList.add("hidden");
});
