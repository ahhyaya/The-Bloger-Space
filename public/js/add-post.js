const addPostFormHandler = async (e) => {
    e.preventDefault();

    const title = $("#post-title").val();
    const content = $("#post-content").val();
    console.log({title, content})
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
 }

 $(".new-post-form").on("submit", addPostFormHandler);