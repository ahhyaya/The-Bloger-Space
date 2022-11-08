const loginFormHandler = async (e) => {
    e.preventDefault();

    const userName = $("#username-login").value.trim();
    const password = $("#password-login").value.trim();

    if (userName && password) {
        const response = await fetch ('/api/users/login', {
            method: 'POST',
            body: JSON.stringify({userName, password}),
            headers: {'content-type' : 'application/json'},
        });

        if (response.ok) {
            document.location.replace('/');
        } else {
            alert('Failed to log in!');
        }
    }
};


$("#login-form").on("submit", loginFormHandler);

