'use strict';

// Default  contacts
let contacts = [
  {
    name: "Nizar",
    phone: "0526579472",
    address: "Tarshisha",
    age: "29",
    email: "Jarayse@gmail.com",
    src: "./img/nizar.jpg",
     note: "Friend from university",
     favorite:false

  },
  {
    name: "Ayman",
    phone: "0534642312",
    address: "tel-aviv",
    age: "23",
    email: "lior19@gmail.com",
    src: "./img/ayman.jpg",
     note: "Work colleague",
     favorite:false
  },
  {
    name: "bayan",
    phone: "0559180977",
    address: "tamra",
    age: "20",
    email: "khatebbayan19@gmail.com",
    src: "./img/bayan.jpg",
    note: "Bike team leader",
     favorite:false
  },
  {
    name: "amer",
    phone: "0556645417",
    address: "Nazareth",
    age: "20",
    email: "amer19@gmail.com",
    src: "./img/amer.jpg",
    note: "chef",
    favorite: false
  },
  {
    name: "ahmed",
    phone: "0549535907",
    address: "Illut",
    age: "20",
    email: "ahmed20@gmail.com",
    src: "./img/ahmed.jpg",
    note:"high school friend",
    favorite:true
  }
];

// DOM elements
const favoritesBtn = document.getElementById("showFavoritesBtn");
const container = document.querySelector(".container");
const contactTemplate = document.querySelector(".contact.template");
const searchInput = document.getElementById("search");
const editModal = document.getElementById("editModal");
const closeModal = document.getElementById("closeModal");
const infoModal = document.getElementById("infoModal");
const infoContent = document.getElementById("infoContent");
const closeInfoModal = document.getElementById("closeInfoModal");
const addUserBtn = document.querySelector('button[title="Add User"]');
const deleteAllBtn = document.querySelector('button[title="Delete All"]');
const form = editModal.querySelector("form");

let editingIndex = null;

//the main function for the contacts list
function renderContacts(list) {
// sort according the favorite
  list.sort((a, b) => {
    if (a.favorite === b.favorite) {
      return a.name.localeCompare(b.name);
    }
    return b.favorite - a.favorite;
  });

 
 document.querySelectorAll(".contact:not(.template)").forEach(c => c.remove());
 // the resbonsible function for each contact that exist in the list or will add by the user 
  list.forEach((contact, index) => {
    const card = contactTemplate.cloneNode(true);
    card.classList.remove("template");
    card.style.display = "flex";

    // function that resbonsible to add the contact to the favorite list 
    if (contact.favorite) {
      card.classList.add("favorite");
    }

    // image settongs 
    const img = card.querySelector("img");
    img.src = contact.src && contact.src.trim() !== "" ? contact.src : "img/d3b1c094-7d0d-4665-997c-83206e76f1a3.png";
    img.alt = contact.name;
    img.onerror = () => {
      img.src = "img/d3b1c094-7d0d-4665-997c-83206e76f1a3.png";
    };

    // outputs in the contact card
  const namePhoneSpan = card.querySelector("span");
    namePhoneSpan.textContent = ""; // clear it befor add new name
  const nameLine = document.createElement("strong");
    nameLine.textContent = contact.name;
  const phoneLine = document.createElement("small");
    phoneLine.textContent = contact.phone;
      namePhoneSpan.appendChild(nameLine);
      namePhoneSpan.appendChild(document.createElement("br")); // line down
      namePhoneSpan.appendChild(phoneLine);



    // ⭐ Favorite button
    const favBtn = document.createElement("button");
    favBtn.innerHTML = contact.favorite ? "⭐" : "☆";
    favBtn.title = contact.favorite ? "Unfavorite" : "Mark as Favorite";
    favBtn.onclick = () => {
      contact.favorite = !contact.favorite;
      renderContacts(contacts);
    };
    card.querySelector(".contact-actions").prepend(favBtn);

    // function for the info settings
    card.querySelector('[title="Info"]').onclick = () => {
      infoContent.innerHTML = `
        <h2>Contact Info</h2>
        <p><strong>Name:</strong> ${contact.name}</p>
        <p><strong>Phone:</strong> ${contact.phone}</p>
        <p><strong>Address:</strong> ${contact.address}</p>
        <p><strong>Age:</strong> ${contact.age || 'N/A'}</p>
        <p><strong>Email:</strong> ${contact.email}</p>
        <p><strong>Note:</strong> ${contact.note || 'N/A'}</p>
      `;
      infoModal.classList.remove("hidden");
    };
    // function for edit settings
   card.querySelector('[title="Edit"]').onclick = () => {
    editingIndex = index;
  
    // Get all inputs and the textarea from the form
  const inputFields = form.querySelectorAll("input");
  const noteField = form.querySelector("textarea");

  // Fill each input from the selected contact   
  inputFields[0].value = contact.name;
  inputFields[1].value = contact.phone;
  inputFields[2].value = contact.address;
  inputFields[3].value = contact.age || '';
  inputFields[4].value = contact.email || '';
  inputFields[5].value = contact.src || '';
 noteField.value = contact.note ||'';
  
  // Open the modal
  editModal.classList.remove("hidden");
};
  // function of the delete button 
    card.querySelector('[title="Delete"]').onclick = () => {
      const confirmDelete = confirm(`Are you sure you want to delete "${contact.name}"?`);
      if (confirmDelete) {
        contacts.splice(index, 1);
        renderContacts(contacts);
      }
    };

    container.appendChild(card);
  });

  updateContactCount(list.length);
}

// function for the counter
function updateContactCount(count) {
  document.getElementById("contactCount").textContent =
    `${count} contact${count === 1 ? '' : 's'}`;
}


// Search functionality
searchInput.addEventListener("input", () => {
  const val = searchInput.value.toLowerCase();
  const filtered = contacts.filter(c => c.name.toLowerCase().includes(val));
  renderContacts(filtered);
});

// Add user
addUserBtn.addEventListener("click", () => {
  editingIndex = null;
  form.reset();
  editModal.classList.remove("hidden");
});

// Delete all
deleteAllBtn.addEventListener("click", () => {
  if (confirm("Delete all contacts?")) {
    contacts = [];
    renderContacts(contacts);
  }
});

// Close button of the edit modal
closeModal.addEventListener("click", () => {
  editModal.classList.add("hidden");
});

// Close button of the info modal
closeInfoModal.addEventListener("click", () => {
  infoModal.classList.add("hidden");
});

function isEmailWithAtSymbol(email) {
  return email.includes("@") && !email.startsWith("@") && !email.endsWith("@");
}


// Handle form submit
form.addEventListener("submit", (e) => {
  e.preventDefault();

  const inputs = form.querySelectorAll("input");
  const name = inputs[0].value.trim();
  const phone = inputs[1].value.trim();

  const email = inputs[4].value.trim();

  if (email && !isEmailWithAtSymbol(email)) {
  alert("Email syntax is not correct. It must contain '@' symbol.\n the '@' may be in the wrong place \n make sure it's not in the start or at the end ");
  return;
}
  //function that required to enterd the name 
  if (name === "") {
    alert("Name is required.");
    return;
  }

  //function that check if the number is vailed or not 
  const isValid = phone.startsWith("05") && /^\d+$/.test(phone) && phone.length === 10;
  if (!isValid) {
    alert("Invalid phone number!\n\nMake sure it:\n1. Starts with '05'\n2. Contains only digits\n3. Is exactly 10 digits long");
    return;
  }



  //function that check if the contact is duplicate or not
  const isDuplicate = contacts.some((c, i) => {
    if (editingIndex !== null && i === editingIndex) return false;
    return c.phone === phone;
  });
// if the contact is duplicate send alert
  if (isDuplicate) {
    alert("A contact with the same phone number already exists.");
    return;
  }

  //object for the values of the new contact
  const textarea = form.querySelector("textarea");
  const newContact = {
    name: name,
    phone: phone,
    address: inputs[2].value,
    age: inputs[3].value,
    email: inputs[4].value || 'N/A',
    src: inputs[5].value || "img/d3b1c094-7d0d-4665-997c-83206e76f1a3.png",
    note: textarea.value
  };
// update contact or add the contact
  if (editingIndex !== null) {
    contacts[editingIndex] = newContact;
  } else {
    contacts.push(newContact);
  }
// sorting according a,b,c
  contacts.sort((a, b) => a.name.localeCompare(b.name));
  editModal.classList.add("hidden");
  renderContacts(contacts);
});

// show favorites only 
favoritesBtn.addEventListener("click", () => {
  const favorites = contacts.filter(c => c.favorite);
  if (favorites.length === 0) {
    alert("There are no favorite contacts.");
  } else {
    renderContacts(favorites);
    favoritesBtn.style.display = "none";
    showAllBtn.style.display = "inline-block";
  }
});
// return to the defult
showAllBtn.addEventListener("click", () => {
  renderContacts(contacts);
  showAllBtn.style.display = "none";
  favoritesBtn.style.display = "inline-block";
});


// Initial render
renderContacts(contacts);