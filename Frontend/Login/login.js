var form=document.getElementById('login-form');

form.addEventListener('submit',SaveToBackend);

async function SaveToBackend(event){
    event.preventDefault();

    const email = event.target.useremail.value;
    const password = event.target.password.value;

    const loginDetails = {
       email,
       password
    }

    try {
        const response = await axios.post("http://localhost:3000/user/login", loginDetails);
        alert(response.data.message);
        console.log(response.data);
        localStorage.setItem('token', response.data.token);

        window.location.href="../ExpenseTracker/index.html"
       
    } catch (error) {
        document.body.innerHTML+=`<h2>${error}</h2>`;
        console.log(error);
    }
   
}


    