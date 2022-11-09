const editPostFormHandler = async (e) => {
    e.preventDefault();

    const title = $("#post-title").value.trim();
    const content = $("#post-content").value.trim();

    const id = window.location.toString().split('/')[
        window.location.toString().split('/').length - 1
    ];

    const response = await fetch(`/api/posts/${id}`, {
        method: 'PUT',
        body: JSON.stringify({
            post_id: id,
            title,
            content
        }),
        headers: {
            'content-type': 'application/json' 
        }
    });

    if(response.ok) {
        document.location.replace('/dashboard/');
    } else {
        alert('Update Failed!');
    }
 }

 $(".edit-post-form").on("submit", editPostFormHandler);