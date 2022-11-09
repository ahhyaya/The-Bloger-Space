const postId = $("#post-id").val();

// EDIT post
const editFormHandler = async (e) => {
    e.preventDefault();

    const postTitle = $("#post-title").val().trim();
    const postContent = $("#post-content").val().trim();

    const id = window.location.toString().split('/')[
        window.location.toString().split('/').length - 1
    ];

    const response = await fetch(`/api/posts/${postId}`, {
        method: 'PUT',
        body: JSON.stringify({
            postTitle,
            postTitle
        }),
        headers: {
            'content-type': 'application/json' 
        }
    });

    if(response.ok) {
        document.location.replace('/dashboard');
    } else {
        alert('Update Failed!');
    }
    document.location.replace('/dashboard');
 }

 // DELETE Post
 const deleteFormHandler = async (e) => {
    e.preventDefault();

    const response = await fetch(`/api/posts/${postId}`, {
        method: 'DELETE',
    });

  
     document.location.replace('/dashboard/');
};


 $("#delete-post-btn").on("click", deleteFormHandler);

 $("#edit-post-btn").on("click", editFormHandler);


 