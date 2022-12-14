// EDIT post

const editFormHandler = async (e) => {
  e.preventDefault();

  const title = $("#post-title").val();
  const content = $("#post-content").val();

  const id = window.location.toString().split("/")[
    window.location.toString().split("/").length - 1
  ];
  const response = await fetch(`/api/posts/${id}`, {
    method: "PUT",
    body: JSON.stringify({
      post_id: id,
      title,
      content,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });
  console.log(response);
  if (response.ok) {
    document.location.replace("/dashboard");
  } else {
    alert("Update Failed!");
  }
};

// DELETE Post
const deleteFormHandler = async (e) => {
  e.preventDefault();

  if (e.target.hasAttribute("data-id")) {
    const id = e.target.getAttribute("data-id");
    const response = await fetch(`/api/posts/${id}`, {
      method: "DELETE",
    });
    if (response.ok) {
      document.location.replace("/dashboard");
    } else {
      alert("Failed to delete project");
    }
  }
};

$("#delete-post-btn").on("click", deleteFormHandler);

$("#edit-post-btn").on("click", editFormHandler);
