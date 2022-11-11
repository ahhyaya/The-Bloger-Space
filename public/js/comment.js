const commentFormHandler = async (e) => {
  e.preventDefault();

  const comment_detail = $(".comment-body").val();

  const id = window.location.toString().split("/")[
    window.location.toString().split("/").length - 1
  ];

  if (comment_detail) {
    const response = await fetch(`/posts/${id}/comments`, {
      method: "POST",
      body: JSON.stringify({
        post_id,
        comment_detail,
      }),
      headers: {
        "content-type": "application/json",
      },
    });

    if (response.ok) {
      document.location.reload();
    } else {
      alert(response.statusText);
      // $(".comment-form").style.display = "block";
    }
  }
};

$(".comment-form").on("submit", commentFormHandler);
