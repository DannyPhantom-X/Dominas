let member = JSON.parse(sessionStorage.getItem('loggedPerson'))
export async function getCart() {
    let cart; 
    if (member) {
        let cartRaw = await fetch(`http://localhost:5030/${member._id}/cart`, {cache: 'no-store'})
        cart = await cartRaw.json()
    }else{
        if (!JSON.parse(localStorage.getItem('cart'))) {
            cart = []
            console.log('guyyyy')
        }else{
            cart = JSON.parse(localStorage.getItem('cart'))
            console.log()
        }
    }
    return cart;
}
export async function saveTocart(item, cart) {
    if (member) {
        fetch(`http://localhost:5030/${member._id}/cart`, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            cache: 'no-store',
            body: JSON.stringify(item)
        }).then(res => res.json())
    }else{
        localStorage.setItem('cart', JSON.stringify(cart))
    }
}

export function editcartQuantity(item, cart) {
    if (member) {
        fetch(`http://localhost:5030/${member._id}/cart/quantity`, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(item)
        }).then((res) => {
            return res.json()
        })
    }else{
        localStorage.setItem('cart', JSON.stringify(cart))
    }
}

export async function deleteCartItem(item, cart, index) {
    if (member) {
       fetch(`http://localhost:5030/${member._id}/cart`, {
            method: 'DELETE',
            headers: {
                'Content-type': 'application/json'
            },
            cache: 'no-store',
            body: JSON.stringify(item)
        }).then((res) => {
            res.json()
            console.log('delete function')
        })
    }else{
        cart.splice(index, 1)
        console.log(cart)
        localStorage.setItem('cart', JSON.stringify(cart))
    }
}