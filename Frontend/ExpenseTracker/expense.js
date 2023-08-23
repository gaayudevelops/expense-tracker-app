var form = document.getElementById('expense-form');

form.addEventListener('submit', SaveToBackend);

async function SaveToBackend(event) {
    event.preventDefault();
    const description = event.target.description.value;
    const category = event.target.category.value;
    const amount = event.target.amount.value;
    const obj = {
        description,
        category,
        amount
    }
    try {
        const token=localStorage.getItem('token'); 
        const response = await axios.post("http://localhost:3000/expense/add-expense", obj,{ headers:{"Authorization":token} })
        const data = response.data.newExpenseDetail;
        showExpenseOnScreen(data)


    } catch (error) {
        document.body.innerHTML += `<h2>${error}</h2>`;
        console.log(error);
    }
}

window.addEventListener("DOMContentLoaded", () => {
    const token=localStorage.getItem('token'); 
    axios.get("http://localhost:3000/expense/get-expenses",{
        headers:{"Authorization":token} //setting the authorisation in response headers as the tokrn encrypted
    })
        .then((response) => {
            for (var i = 0; i < response.data.allExpenses.length; i++) {
                showExpenseOnScreen(response.data.allExpenses[i])
            }
        })
        .catch((err) => {
            console.log(err);
        })
})

function showExpenseOnScreen(obj) {

    const parentElem = document.getElementById('items');
    const childElem = document.createElement('li');
    childElem.textContent = ' ' + 'Description :' + obj.description + ' | ' + 'Category :' + obj.category + ' | ' + 'Amount :' + obj.amount;


    const deleteButton = document.createElement('input');
    deleteButton.className = "del-btn";
    deleteButton.type = 'button';
    deleteButton.value = 'Delete';
    deleteButton.onclick = () => {

        parentElem.removeChild(childElem);
        axios.delete(`http://localhost:3000/expense/delete-expense/${obj.id}`)
            .then((response) => { })
            .catch((err) => {
                document.body.innerHTML += "<h2>Something went Wrong</h2>";
                console.log(err);
            })

    }
    childElem.appendChild(deleteButton);
    parentElem.appendChild(childElem);

}

document.getElementById('rzp-btn').onclick = async function(event) {

    const token=localStorage.getItem('token');
    const response = await axios.get("http://localhost:3000/purchase/premium-membership", { headers:{"Authorization":token} })
    const options = {
        "key": response.data.key_id,
        "order_id":response.data.order.id,
        "handler":async function (response){
            await axios.post("http://localhost:3000/purchase/updatetransactionstatus",{
                order_id:options.order_id,
                payment_id:response.razorpay_payment_id
            }, {headers:{"Authorization":token}});
            
           alert("You are a Premuim user now!")   
        }
    };
    const rzp1 = new Razorpay(options);
    rzp1.open();
    event.preventDefault();

    rzp1.on('payment.failed', async function (response){
        await axios.post("http://localhost:3000/purchase/updatetransactionstatus",{
            order_id:options.order_id,
            payment_id:response.razorpay_payment_id // if transaction is failed no payment key is generated
        }, {headers:{"Authorization":token}})

        alert('Transaction FAILED!')
    });
}


    

