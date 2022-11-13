const commentFormHandler = async (e) => {
  e.preventDefault();

  const comment_detail = $("#comment-body").val();
  console.log(comment_detail)

  const id = window.location.toString().split("/")[
    window.location.toString().split("/").length - 1
  ];

  if (comment_detail) {
    const response = await fetch(`/api/posts/${id}/comments`, {
      method: "POST",
      body: JSON.stringify({
        post_id: id,
        comment_detail,
      }),
      headers: {
        "content-type": "application/json",
      },
    });

    if (response.ok) {
      document.location.replace(`/posts/${id}/comments`);
    } else {
      alert(response.statusText);
    }
  }
};

$("#comment-btn").on("click", commentFormHandler);
