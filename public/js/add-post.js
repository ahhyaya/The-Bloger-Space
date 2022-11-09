const addPostFormHandler = async (e) => {
    e.preventDefault();

    const title = $("#post-title").val();
    const content = $("#post-content").val();
    console.log({title,content})
    const response = await fetch('/api/posts', {
        method: 'POST',
        body: JSON.stringify({
            title,
            content
        }),
        headers: {
            'content-type': 'application/json' 
        }
    });

    if(response.ok) {
        document.location.replace('/dashboard');
    } else {
        alert('Request Failed!');
    }
 }

 $("#add-new-post-btn").on("click", addPostFormHandler);