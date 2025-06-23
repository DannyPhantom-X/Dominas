import {getCart, deleteCartItem, saveTocart, editcartQuantity} from './cart-data.js'
let member = JSON.parse(sessionStorage.getItem('loggedPerson'))
let cart;
let noOfItems = 0;
let shippingFee = 1000
let totalPrice = 0
loadCartItems()
async function loadCartItems() {
    cart = await getCart();
    let sumItem = '';
    console.log('sumItem')
    cart.forEach((item) => {
        sumItem += `
            <div class="cart-item"> 
                <div class="cart-cont-img">
                    <img class="cart-img" src="${item.image}">
                </div>
                <div class="cart-info">
                    <p>${item.pastryName}</p>
                    <p>Price: ${item.price}</p>
                    <p>Quantity:<button class="edit-nob-add edit-nob-add-${item._id}">+</button><span class="nob nob-${item._id}">${item.quantity}</span><button class="edit-nob-subtract edit-nob-subtract-${item._id}">-</button></p>
                </div>
            </div>            
        `;
        console.log(typeof item.price)
        const price = item.quantity * item.price
        noOfItems += item.quantity
        totalPrice += price
        console.log(totalPrice)
    });
    if (totalPrice === 0 || !member) {
            document.querySelector('.order-button').disabled = true
        }
    if (!sumItem) {
        console.log('yooo')
        noOfItems = 0
        totalPrice = 0
    }   
    console.log(noOfItems)
    document.querySelector('.cart-cont-details').innerHTML = sumItem;
    document.querySelector('.no-of-items').innerHTML = noOfItems;
    document.querySelector('.js-shipping-price').innerHTML = shippingFee;
    document.querySelector('.js-total-price').innerHTML = totalPrice;
    document.querySelector('.js-total-money').innerHTML = totalPrice + shippingFee;
    onclickAdd()
    onclickSub()
}
document.querySelector('.name').addEventListener('click', () => {
    window.location.href = './home.html'
})
document.querySelector('.order-button').addEventListener('click', async() => {
    let orders = cart
    const dateClass = new Date()
    const date = dateClass.toString().split(' ')
    orders.forEach((order) => {
        order.day = date[0]
        order.month = date[1]
        order.date = date[2]
        order.year = date[3]
        order.time = date[4]
    })
    const confirmOrder = document.querySelector('.confirm-order')
    confirmOrder.classList.add('confirm-order-style')
    confirmOrder.innerHTML = `<div class="cancel"><button>❌</button></div>
                    <div class="confirm-statement">You are about to make an order</div>
                    <div class="confirm-order-div"><button class="confirm-order-button">Order</button></div>`
    document.querySelector('.cart-cont-details').style.filter = 'grayscale(100%)'
    document.querySelector('.order-summary').style.filter = 'grayscale(100%)'
    document.body.style.overflow = 'hidden'
    document.querySelector('.cancel').addEventListener('click', () => {
        confirmOrder.classList.remove('confirm-order-style')
        document.querySelector('.cart-cont-details').style.filter = ''
        document.querySelector('.order-summary').style.filter = ''
        document.body.style.overflow = ''
        confirmOrder.innerHTML = ''
    })
    document.querySelector('.confirm-order').addEventListener('click', () => {
        orders.forEach((order) => {
        fetch(`http://localhost:5030/${member._id}/order`, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(order)
            })
        })
        
        cart.forEach( async(cartItem, i) => {
            await deleteCartItem(cartItem, cart, i)
        })
        document.querySelector('.cancel').click()
    })
})

function onclickAdd() {
    cart.forEach((item) => {
        document.querySelector(`.edit-nob-add-${item._id}`).addEventListener('click', async () => {
            item.quantity += 1
            document.querySelector(`.nob-${item._id}`).innerHTML = item.quantity
            await editcartQuantity(item, cart)
        })
    })   
}
function onclickSub() {
    cart.forEach((item, i) => {
        document.querySelector(`.edit-nob-subtract-${item._id}`).addEventListener('click', async () => {
            if (item.quantity !== 1) {
                item.quantity -= 1
                console.log('decreased to: ' + item.quantity)
                document.querySelector(`.nob-${item._id}`).innerHTML = item.quantity
                await editcartQuantity(item, cart)
            }else{
                console.log('equal to 1')
                await deleteCartItem(item, cart, i)
                cart = await getCart()
                await loadCartItems()
            }
            
        })
    })
}