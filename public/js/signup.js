
const signupFormHandler = async (e) => {
    e.preventDefault();

    const username = $("#username-signup").val().trim();
    const password = $("#password-signup").val().trim();

    if (username && password) {
        const response = await fetch ('/api/users', {
            method: 'POST',
            body: JSON.stringify({username, password}),
            headers: { 'Content-Type': 'application/json','Accept': 'application/json' },
        });
       
        if(response.ok) {
            document.location.replace('/dashboard');
        } else {
            alert('Fail to sign up!');
        }
    }
};

$("#signup-form").on("submit", signupFormHandler);
