// firebase.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-app.js";
import { getDatabase, ref, push, set } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-database.js";

// Tera config
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

// 👇 contact form logic
document.getElementById('contactForm').addEventListener('submit', function (e) {
  e.preventDefault();

  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const message = document.getElementById('message').value;

  const messagesRef = ref(database, 'ContactDetails/');
  const newMessageRef = push(messagesRef);

  set(newMessageRef, {
    name: name,
    email: email,
    message: message,
    datetime: new Date().toString()
  }).then(() => {
    document.getElementById('status').innerHTML =
      `<p style='font-size:18px; font-weight:500;'> Hello, ${name}. Thank you for contacting me. <br> I will contact you soon. </p>`;
    document.getElementById('status').style.color = "green";
    document.getElementById('contactForm').reset();
  }).catch(() => {
    document.getElementById('status').innerText = "There is some issue!! Please Try again";
    document.getElementById('status').style.color = "red";
  });
});
