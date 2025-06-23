let email;
let password;
document.querySelector('.submit-input').addEventListener('click', () => {
    email = document.querySelector('.email-input').value
    password = document.querySelector('.password-input').value

    if (!email ||  email.indexOf('@') < 1 || email.lastIndexOf('.') < 1) {
        document.querySelector('.provide').innerHTML = 'Provide a valid Email'
        setTimeout(() => document.querySelector('.provide').innerHTML = '', 5000)
    }else if (!password)  {
        document.querySelector('.provide').innerHTML = 'Enter Your Password'
        setTimeout(() => document.querySelector('.provide').innerHTML = '', 5000)
    }else {
        fetch('http://localhost:5030/login', {
            method: 'Post',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({ 
                    email: email,
                    password: password
                }) 
        }).then((res) => {
            return res.json()
        }).then((member) => {
            if (member) {
                sessionStorage.setItem('loggedPerson', JSON.stringify(member));
                window.location.href = '../home.html';
            }else{
                document.querySelector('.provide').innerHTML = 'Invalid email/password'
            setTimeout(() => document.querySelector('.provide').innerHTML = '', 5000)
            }
        })
    }
    
})