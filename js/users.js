var followButton = document.querySelector('.toggleFollow');

followButton.addEventListener('click', toggleFollow);

function toggleFollow() {
    if (followButton.classList.contains('glyphicon-plus')) {
        followButton.classList.remove('glyphicon-plus');
        followButton.classList.add('glyphicon-minus');
        alert('You are now following this user');
    } else if (followButton.classList.contains('glyphicon-minus')) {
        followButton.classList.remove('glyphicon-minus');
        followButton.classList.add('glyphicon-plus');
        alert('You have unfollowed this user');
    }
}

function userListItem() {

    

}