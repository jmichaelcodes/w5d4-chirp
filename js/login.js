var fullName = document.querySelector('#name').parentNode;
var userName = document.querySelector('#username').parentNode;
var password = document.querySelector('#password').parentNode;
var confirmPassword = document.querySelector('#confirmPassword').parentNode;
var avatar = document.querySelector('#avatar').parentNode;
var isLogin = true;

var fullNameValue = '';
var userNameValue = '';
var passwordValue = '';
var confirmPasswordValue = '';
var avatarValue = '';

var actionButton = document.querySelector('#actionButton');
var actionLink = document.querySelector('#actionLink');

actionLink.addEventListener('click', showConfirmPassword);
actionButton.addEventListener('click', useActionButton);

sessionStorage.clear();

function showConfirmPassword() {
    // if (actionLink.innerText === 'Sign Up') {
    if (isLogin) {
        confirmPassword.classList.remove('hidden');
        fullName.classList.remove('hidden');
        avatar.classList.remove('hidden');
        actionButton.innerText = 'Sign Up';
        actionLink.innerText = 'Sign In';
        isLogin = false;
    }
    else if (!isLogin) {
        confirmPassword.classList.add('hidden');
        fullName.classList.add('hidden');
        avatar.classList.add('hidden');
        actionButton.innerText = 'Sign In';
        actionLink.innerText = "Sign Up"
        isLogin = true;
    }
}

function useActionButton() {
    fullNameValue = document.querySelector('#name').value;
    userNameValue = document.querySelector('#username').value;
    passwordValue = document.querySelector('#password').value;
    confirmPasswordValue = document.querySelector('#confirmPassword').value;
    avatarValue = document.querySelector('#avatar').value;

    if (isLogin) {
        login();
    } else if (!isLogin) {
        register();
    }
}

function register() {
    console.log(`Full Name: ${fullNameValue} Username: ${userNameValue} Password: ${passwordValue} Confirm Password: ${confirmPasswordValue} AvatarURL: ${avatarValue}`);
    
    if (passwordValue === confirmPasswordValue) {
        fetch('https://nameless-anchorage-55016.herokuapp.com/users', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
        },

        body: JSON.stringify({
            name: fullNameValue,
            username: userNameValue,
            password: passwordValue,
            avatar: avatarValue,
        })
    })
        .then(function(response) {
            return response.json();
        })
        .then(function(response) {
            console.log(response.api_token);

            if (response.api_token) {
                sessionStorage.setItem('token', response.api_token);
                location.href = 'profile.html';
            }
            else {
                // alert('There was an error. Check out your console.');
                alert('User has been registered. Please sign in');
                document.querySelector('#name').value = '';
                document.querySelector('#username').value = '';
                document.querySelector('#password').value = '';
                document.querySelector('#confirmPassword').value = '';
                document.querySelector('#avatar').value = '';
                showConfirmPassword();
                console.log(response);
            }
        })
    } else {
        alert('Your passwords must match');
    }

}

function login() {
    console.log(`Username: ${userNameValue} Password: ${passwordValue}`);
    fetch('https://nameless-anchorage-55016.herokuapp.com/signin', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },

        body: JSON.stringify({
            username: userNameValue,
            password: passwordValue,
        })
    })
        .then(function(response) {
            return response.json();
        })
        .then(function(response) {
            console.log('response ' + response);

            if (response.api_token) {
                sessionStorage.setItem('token', response.api_token);
                location.href = 'profile.html';
            }
            else {
                alert('There was an error. Check out your console.');
                console.log('error response: ' + response);
            }
        })
}