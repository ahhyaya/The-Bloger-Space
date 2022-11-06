const addPostFormHandler = async (e) => {
    e.preventDefault();

    const title = $("#post-title").value;
    const content = $("#post-content").value;

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

 $("#post-form").on("submit", addPostFormHandler);