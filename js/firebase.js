var firebaseConfig = {
    apiKey: "AIzaSyAdsT5uy07GzLjswxhP6SvH_qT5OCFXjRU",
    authDomain: "contactformwebsite-b2c9d.firebaseapp.com",
    projectId: "contactformwebsite-b2c9d",
    storageBucket: "contactformwebsite-b2c9d.firebasestorage.app",
    messagingSenderId: "701514212296",
    appId: "1:701514212296:web:f4842686530bfea0c056fd"
  };


firebase.initializeApp(firebaseConfig);

var messagesRef = firebase.database().ref('ContactDetails/');

document.getElementById('contactForm').addEventListener('submit', submitForm);

function submitForm(e) {
    e.preventDefault();

    // Get values 
    var name = getInputVal('name');
    var email = getInputVal('email');
    var message = getInputVal('message');

    saveMessage(name, email, message);
}

// Function to get get form values 
function getInputVal(id) {
    return document.getElementById(id).value;
}
function setInputVal(id) {
    // return document.getElementById(id) = 
}

// Save message to firebase 
function saveMessage(name, email, message) {
    var newMessageRef = messagesRef.push();
    newMessageRef.set({
        name: name,
        email: email,
        message: message,
        datetime: new Date().toString()
    }).then(() => {
        document.getElementById('status').innerHTML =
            " <p style='font-size:18px; font-weight:500; '> Hello," + name + " .Thank you for contacting me. <br> I will contact you soon. </p>"
        document.getElementById('status').style.color = "green";
        document.getElementById('status').style.fontWeight = "500";

        setInputVal('name');
        setInputVal('email');
        setInputVal('message');

    }

    ).catch(() => {
        document.getElementById('status').innerHTML =
            "There is some issue !! Please Try again"
        document.getElementById('status').style.color = "red";
        document.getElementById('status').style.fontWeight = "500";
        document.getElementById('status').style.fontSize = "20";
    }
    );
}
