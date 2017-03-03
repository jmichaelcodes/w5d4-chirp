// var followButton = document.querySelector('.toggleFollow');

// // followButton.addEventListener('click', toggleFollow);

// var isFollowing = false;



getUsers();

// function toggleFollow() {
//     if (!isFollowing) {
//         followButton.classList.remove('hidden');
//         followButton.classList.add('glyphicon-minus');
//         alert('You are now following this user');
//     } else if (followButton.classList.contains('glyphicon-minus')) {
//         followButton.classList.remove('glyphicon-minus');
//         followButton.classList.add('glyphicon-plus');
//         alert('You have unfollowed this user');
//     }
// }

function getUsers() {
    var token = sessionStorage.getItem('token');

    fetch('https://nameless-anchorage-55016.herokuapp.com/users')
    .then(function(response) {
        return response.json();
    })
    .then(function(response) {
        renderUsersList(response);
        console.log('response' + response)
    })
}

function renderUsersList(users) {
    console.log(users);

    users.forEach(function(user) {
        var userListItem = `<li class="list-group-item">
                            <div class="userListItem">
                                 <span class="userName">${user.username}</span>
                                <span class="glyphicon glyphicon-plus pull-right" id="notFollowing" aria-hidden="true"></span>
                                <span class="glyphicon glyphicon-minus pull-right hidden" id="following" aria-hidden="true"></span>
                            </div>
                        </li>`;

        document.querySelector('#userList').innerHTML += userListItem;
    });
}