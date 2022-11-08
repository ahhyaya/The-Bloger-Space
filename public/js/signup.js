
const signupFormHandler = async (e) => {
    e.preventDefault();

    const userName = $("#username-signup").val().trim();
    const password = $("#password-signup").val().trim();

    if (userName && password) {
        const response = await fetch ('/api/users', {
            method: 'POST',
            body: JSON.stringify({userName, password}),
            headers: {'content-type' : 'application/json'},
        });

        if(response.ok) {
            document.location.replace('/');
        } else {
            alert('Fail to sign up!');
        }
    }
};

$("#signin-btn").on("submit", signupFormHandler);
