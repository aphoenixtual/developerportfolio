import { initializeApp } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-app.js";
import { getDatabase, ref, push, set } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-database.js";

// Your Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyAdsT5uy07GzLjswxhP6SvH_qT5OCFXjRU",
  authDomain: "contactformwebsite-b2c9d.firebaseapp.com",
  databaseURL: "https://contactformwebsite-b2c9d-default-rtdb.firebaseio.com",
  projectId: "contactformwebsite-b2c9d",
  storageBucket: "contactformwebsite-b2c9d.firebasestorage.app",
  messagingSenderId: "701514212296",
  appId: "1:701514212296:web:f4842686530bfea0c056fd"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

// Handle form submission
document.getElementById('contactForm').addEventListener('submit', function (e) {
  e.preventDefault();

  const name = document.getElementById('name').value.trim();
  const email = document.getElementById('email').value.trim();
  const message = document.getElementById('message').value.trim();
  const statusEl = document.getElementById('status');

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  // Basic Validation
  if (!name) {
    statusEl.innerText = "Name is required.";
    statusEl.style.color = "red";
    return;
  }

  if (!emailPattern.test(email)) {
    statusEl.innerText = "Please enter a valid email address.";
    statusEl.style.color = "red";
    return;
  }

  if (!message) {
    statusEl.innerText = "Message cannot be empty.";
    statusEl.style.color = "red";
    return;
  }

  // All good? Save to Firebase
  const messagesRef = ref(database, 'ContactDetails/');
  const newMessageRef = push(messagesRef);

  set(newMessageRef, {
    name: name,
    email: email,
    message: message,
    datetime: new Date().toString()
  }).then(() => {
    statusEl.innerHTML = `<p>Hey <strong>${name}</strong> <br>Thank you for connecting...<br>Catch you soon 😎</p>`;
    statusEl.classList.add("show");
    statusEl.style.color = "";
    document.getElementById('contactForm').reset();
  }).catch(() => {
    statusEl.innerText = "There is some issue!! Please try again.";
    statusEl.style.color = "red";
  });
});
