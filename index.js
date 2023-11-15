document.addEventListener('DOMContentLoaded', function () {
    checkLoginStatus();
});

function registerUser() {
    var username = document.getElementById('regUsername').value;
    var password = document.getElementById('regPassword').value;

    if (username && password) {
        var users = JSON.parse(localStorage.getItem('users')) || {};
        if (!users[username]) {
            // Using a simple hashing function for demonstration purposes
            var hashedPassword = hashPassword(password);
            users[username] = hashedPassword;
            localStorage.setItem('users', JSON.stringify(users));
            alert('Registration successful!');
        } else {
            alert('Username already exists. Choose another username.');
        }
    } else {
        alert('Please enter both username and password.');
    }
}

function loginUser() {
    var username = document.getElementById('loginUsername').value;
    var password = document.getElementById('loginPassword').value;

    var users = JSON.parse(localStorage.getItem('users')) || {};
    var hashedPassword = hashPassword(password);

    if (users[username] && users[username] === hashedPassword) {
        // Login successful
        document.getElementById('registrationForm').style.display = 'none';
        document.getElementById('loginForm').style.display = 'none';
        document.getElementById('securedPage').style.display = 'block';
    } else {
        alert('Incorrect username or password. Please try again.');
    }
}

function logout() {
    document.getElementById('registrationForm').style.display = 'block';
    document.getElementById('loginForm').style.display = 'block';
    document.getElementById('securedPage').style.display = 'none';
}

function checkLoginStatus() {
    var securedPage = document.getElementById('securedPage');
    var users = JSON.parse(localStorage.getItem('users')) || {};

    if (Object.keys(users).length > 0) {
        securedPage.style.display = 'none';
    }
}

function hashPassword(password) {
    // Simple hashing function (not for production use)
    var hash = 0;
    for (var i = 0; i < password.length; i++) {
        var char = password.charCodeAt(i);
        hash = (hash << 5) - hash + char;
    }
    return hash.toString();
}
