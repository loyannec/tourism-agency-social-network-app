$(() => {
    const locationId = window.location.pathname.split('/')[2];
    const likeClass = 'bg-primary';
    const likeButton = $('#like-button');
    const dislikeButton = $('#dislike-button');
    const likesCount = $('#likes-count');
    const dislikesCount = $('#dislikes-count');

    $('#addCommentButton').click(() => {
        const comment = $('#comment').val();
        $.post(`/location/${locationId}/comment`, { comment }, (data, status) => {
            if (status !== 'success') return;
            $('#previous-comments').prepend(data);
        });
    });

    likeButton.click(() => {
        $.post(`/location/${locationId}/recommend`, { like: hasLike() ? null : true }, (data, status) => {
            if (status !== 'success') return;
            likeButton.toggleClass(likeClass);
            dislikeButton.removeClass(likeClass);
            likesCount.html(data.likes);
            dislikesCount.html(data.dislikes);
        });
    });

    dislikeButton.click(() => {
        $.post(`/location/${locationId}/recommend`, { like: hasDislike() ? null : false }, (data, status) => {
            if (status !== 'success') return;
            likeButton.removeClass(likeClass);
            dislikeButton.toggleClass(likeClass);
            likesCount.html(data.likes);
            dislikesCount.html(data.dislikes);
        });
    });

    function hasLike() {
        return likeButton.hasClass(likeClass);
    }

    function hasDislike() {
        return dislikeButton.hasClass(likeClass);
    }
});
