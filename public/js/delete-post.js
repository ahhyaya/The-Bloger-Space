const deletePostFormHandler = async (e) => {
    e.preventDefault();

    const id = window.location.toString().split('/')[
        window.location.toString().split('/').length - 1
    ];

    const response = await fetch(`/api/posts/${id}`, {
        method: 'DELETE',
        body: JSON.stringify({
            post_id: id
        }),
        headers: {
            'content-type': 'application/json' 
        }
    });

    if(response.ok) {
        document.location.replace('/dashboard/');
    } else {
        alert(response.statusText);
    }
 }

 $("#delete-post-btn").on("click", deletePostFormHandler);

