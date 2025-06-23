import {getCart, saveTocart, deleteCartItem, editcartQuantity} from './cart-data.js'
import {renderHome} from './renderhome.js'
import { renderSearch } from './rendersearch.js';
const member = JSON.parse(sessionStorage.getItem('loggedPerson'))

let cart;
await renderHome(addToCart, cartChecker)

async function cartChecker() { 
    cart = await getCart()
    if (cart !== null) {
        cart.forEach((cartItem) => {
            // document.querySelector(`.js-add-cart-button-${cartItem._id}`).style.display = 'flex'
            // document.querySelector(`.js-add-cart-button-${cartItem._id}`).style.justifyContent = 'spaceBetween'
            document.querySelector(`.js-add-cart-container-${cartItem._id}`).innerHTML = `<button class="edit-nob-add edit-nob-add-${cartItem._id}">+</button><span class="nob nob-${cartItem._id}">${cartItem.quantity}</span><button class="edit-nob-subtract edit-nob-subtract-${cartItem._id}">-</button>`
            // localStorage.setItem('cart', JSON.stringify(cart))
        })
        await onclickAdd()
        await onclickSub() 
    }
}
async function addToCart(products) {
    products.forEach((product) => {
        document.querySelector(`.js-add-cart-button-${product._id}`).addEventListener('click', async () => {
            product.quantity = 1
            cart.push(product)
            await saveTocart(product, cart)
            document.querySelector(`.js-add-cart-container-${product._id}`).innerHTML = `<button class="edit-nob-add edit-nob-add-${product._id}">+</button><span class="nob nob-${product._id}">${product.quantity}</span><button class="edit-nob-subtract edit-nob-subtract-${product._id}">-</button>`
        })  
    })
    await onclickAdd()
    await onclickSub()
}
async function onclickAdd() {
    cart = await getCart()
    cart.forEach((cartItem) => {
        let butt = document.querySelector(`.edit-nob-add-${cartItem._id}`)
            butt.addEventListener('click', async () => {
                cartItem.quantity += 1
                await editcartQuantity(cartItem, cart)
                document.querySelector(`.nob-${cartItem._id}`).innerHTML = cartItem.quantity 
            })
    })
}
async function onclickSub() {
    cart = await getCart()
    cart.forEach((cartItem, i) => {
        let butt = document.querySelector(`.edit-nob-subtract-${cartItem._id}`)      
        butt.addEventListener('click', async () => {
            if (cartItem.quantity == 1) { 
                // renderHome(addToCart)
                await deleteCartItem(cartItem, cart, i)
                document.querySelector(`.js-add-cart-container-${cartItem._id}`).innerHTML = `<button class="add-cart-button js-add-cart-button-${cartItem._id}" data-cartItem-id="${cartItem._id}">ADD TO CART</button>`
                document.querySelector(`.js-add-cart-button-${cartItem._id}`).addEventListener('click', async () => {
                    cart.push(cartItem)
                    await saveTocart(cartItem, cart)
                    document.querySelector(`.js-add-cart-container-${cartItem._id}`).innerHTML = `<button class="edit-nob-add edit-nob-add-${cartItem._id}">+</button><span class="nob nob-${cartItem._id}">${cartItem.quantity}</span><button class="edit-nob-subtract edit-nob-subtract-${cartItem._id}">-</button>`
                    await onclickAdd()
                    await onclickSub() 
                })
            }else{
                cartItem.quantity -= 1
                await editcartQuantity(cartItem, cart)
                document.querySelector(`.nob-${cartItem._id}`).innerHTML = cartItem.quantity
            }
                    
        })
        
    })
}


const searchBar = document.getElementById('search-bar')
document.querySelector('.search-button').addEventListener('click', () => {renderSearch()})


searchBar.addEventListener('keypress', (event) => {
    if(event.key == 'Enter') {renderSearch()}
})

if (member) { 
    document.querySelector('.login').innerHTML = `Welcome ${member.firstName}`
}

