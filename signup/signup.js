let firstName;
let lastName;
let email;
let createPassword;
let confirmPassword;
console.log('hello')

document.querySelector('.signup-button').addEventListener('click', () => {
    console.log('hello')
    firstName = document.querySelector('.first-name').value
    lastName = document.querySelector('.last-name').value 
    email = document.querySelector('.email').value 
    createPassword = document.querySelector('.creapassword').value
    confirmPassword = document.querySelector('.confpassword').value
    if(!firstName) {
        document.querySelector('.first-name').style.borderStyle = 'solid';
        document.querySelector('.first-name').style.borderColor = 'red';
        document.querySelector('.not-equal').innerHTML = 'Provide First Name'
        document.querySelector('.not-equal').style.marginTop = '25px'
        setTimeout(() => {
            document.querySelector('.not-equal').innerHTML = ''
            document.querySelector('.not-equal').style.marginTop = '0px'
            document.querySelector('.first-name').style.borderStyle = 'none';
        }, 5000)
    }else if(!lastName) {
        document.querySelector('.last-name').style.borderStyle = 'solid';
        document.querySelector('.last-name').style.borderColor = 'red';
        document.querySelector('.not-equal').innerHTML = 'Provide Last Name'
        document.querySelector('.not-equal').style.marginTop = '25px'
        setTimeout(() => {
            document.querySelector('.not-equal').innerHTML = ''
            document.querySelector('.not-equal').style.marginTop = '0px'
        }, 5000)
    }else if(!email || email.indexOf('@') === -1 || email.indexOf('.') === -1) {
        document.querySelector('.email').style.borderStyle = 'solid';
        document.querySelector('.email').style.borderColor = 'red';
        document.querySelector('.not-equal').innerHTML = 'Provide a valid Email'
        document.querySelector('.not-equal').style.marginTop = '25px'
        setTimeout(() => {
            document.querySelector('.not-equal').innerHTML = ''
            document.querySelector('.not-equal').style.marginTop = '0px'
        }, 5000)
    }else if(!createPassword) {
        document.querySelector('.creapassword').style.borderStyle = 'solid';
        document.querySelector('.creapassword').style.borderColor = 'red';
    }else if(!confirmPassword) {
        document.querySelector('.confpassword').style.borderStyle = 'solid';
        document.querySelector('.confpassword').style.borderColor = 'red';
    }else if(confirmPassword !== createPassword) {
        document.querySelector('.not-equal').innerHTML = 'Password does not match'
        document.querySelector('.not-equal').style.marginTop = '25px'
        setTimeout(() => {
            document.querySelector('.not-equal').innerHTML = ''
            document.querySelector('.not-equal').style.marginTop = '0px'
        }, 5000)
    }else{
        fetch('http://localhost:5030/signup', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({
                firstName,
                lastName,
                email,
                password: confirmPassword
            })
        })
    }
})