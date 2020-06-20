$(() => {
    const locationId = window.location.pathname.split('/')[2];

    $('#addCommentButton').click(() => {
        const comment = $('#comment').val();

        $.post(`/location/${locationId}/comment`, { comment }, (data, status) => {
            if (status !== 'success') return;
            console.log('data: ' + JSON.stringify(data));
        });
    });
});
