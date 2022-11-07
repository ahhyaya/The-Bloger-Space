
const signupFormHandler = async (e) => {
    e.preventDefault();

    const userName = $("#username-signup").value.trim();
    const password = $("#password-signup").value.trim();

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

$("#signup-form").on("submit", signupFormHandler);
