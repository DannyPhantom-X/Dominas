export function renderSearch() {
    let newProducts;
    const loadOut = document.querySelector('.container');
    let searchWord = document.querySelector('#search-bar').value
    if(searchWord) {
        fetch(`http://localhost:5030/search?value=${searchWord}`).then((res) => {
            return res.json();
        })
        .then((data) => {
            console.log(data);
            newProducts = data;
            console.log(newProducts);
        })
        .then(() => {
            let newLoad = '';
            //load the product from products list/array (by adding all the html for each product and making it equals to a variable)
            newProducts.forEach((product, index) => {
                newLoad += `<div class="selection js-selection" data-product-index="${product.id}">
                <div style="width: 100%; 
                height: 300px;">
                        <img class="chocolate-doughnuts-img" src="${product.image}">            
                </div>
                <div>
                    <p class="pastry">${product.pastryName}</p>
                </div>
                <div>
                    <p>${product.price}</p>
                </div>
                <div class="added"></div>
                <div class="js-add-cart-container-${product.id} add-cart-container">
                    <button class="add-cart-button js-add-cart-button-${product.id}" data-product-id="${product.id}">ADD TO CART</button>
                </div>
            </div>`
            })
            //display the products which have just been loaded on the screen
            loadOut.innerHTML = newLoad
        })
    }
}