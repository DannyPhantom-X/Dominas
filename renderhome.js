export function renderHome (param1, param2) {
    let products;
    let load = '';
    const loadOut = document.querySelector('.container');
    fetch('http://localhost:5030/products').then((res) => {
        return res.json();
     })
     .then((data) => {
         products = data;
     })
     .then(async () => {
         //load the product from products list/array (by adding all the html for each product and making it equals to a variable)
         products.forEach((product, index) => {
             load += `<div class="selection js-selection" data-product-index="${product._id}">
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
             <div class="js-add-cart-container-${product._id} add-cart-container">
                 <button class="add-cart-button js-add-cart-button-${product._id}" data-product-id="${product._id}">ADD TO CART</button>
             </div>
         </div>`


         
            
         })
         //display the products which have just been loaded on the screen
        loadOut.innerHTML = load;

        await param1(products)
        param2() 
     })
}
