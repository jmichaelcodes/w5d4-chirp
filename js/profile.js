document.querySelector('#postButton').addEventListener('click', sendMessage);

getMessages();

function getMessages() {
    document.querySelector('#messageList').innerHTML = '';
    var token = sessionStorage.getItem('token');

    fetch('https://nameless-anchorage-55016.herokuapp.com/posts')
    .then(function(response) {
        return response.json();
        console.log(response);
    })
    .then(function(response) {
        renderMessagesList(response);
        document.querySelector('#postMessage').value = '';

    })
}

function renderMessagesList(messages) {
    console.log(messages);

    messages.forEach(createMessage);
}

function createMessage(message) {
    var messageListItem = `<li class="list-group-item">
                            <div class="row">
                            <div class="col-sm-2">
                                <img id="avatarImage" src="http://robohash.org/winter"/>
                                <div class="otherUsername">${message.user.username}</div>
                            </div>
                            <div class="userListItem otherChirp col-sm-10">
                                ${message.body}
                            </div>
                        </li>`
    var currentMessagesHTML = document.querySelector('#messageList').innerHTML;

    document.querySelector('#messageList').innerHTML = messageListItem + currentMessagesHTML;
}

function sendMessage() {
    var message = document.querySelector('#postMessage').value;
    var token = sessionStorage.getItem('token');

    console.log("message " + message);

    // document.querySelector('#postMessage').value = '';

    fetch('https://nameless-anchorage-55016.herokuapp.com/posts', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },

        // Back-end controls the left side, properties, of this object
        // Front-end controls the variables names and values on the right side
        body: JSON.stringify({
            body: message,
            // user:  user,
            api_token: token
        })
    })
        .then(function(response) {
            console.log(response.json);
            return response.json();
        })
        .then(function(response) {
            console.log(response);

            alert('message was posted');
            getMessages();
        })
}