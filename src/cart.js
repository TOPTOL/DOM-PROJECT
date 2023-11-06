
let label = document.getElementById ("label");
let shoppingCart = document.getElementById("shopping-cart");

let basket = JSON.parse(localStorage.getItem("data")) || [] ; 

let calculation = () => {
    let cartIcon = document.getElementById("cartAmount");
    cartIcon.innerHTML= basket.map((y) => y.item).reduce((x, y) => x + y, 0);
    
};

calculation ();

let generateCartItems = () => {  
    if(basket.length !==0){ 
        return (shoppingCart.innerHTML = basket.map((y)=>{
            let { id, item } = y;
            let search = shopItemsData.find((t)=>t.id === id) || [];
            return `
            <div class="cart-item">
                <img width="100" src=${search.img} alt=""/>
                <div class="details">

                    <div class="title-price-y">
                        <h4 class="title-price">
                            <p>${search.name}</p>
                            <p class="cart-item-price">$ ${search.price}</p>
                        <h4>
                        <i onclick="removeItem(${id})" class="bi bi-x-lg"></i>
                    </div>

                    <div class="butttons">
                        <i onclick="decrement(${id})" class="bi bi-dash-lg"></i>
                        <div id=${id} class="quantity">${item}</div>
                        <i  onclick="increment(${id})" class="bi bi-plus-lg"></i>
                    </div>

                    <h3>$ ${item * search.price}<h3>
                </div>
            </div>
            `;
             })
            .join(""));
    } else{
        shoppingCart.innerHTML = ``;
        label.innerHTML = `
        <h2>Cart is Empty</h2>
        <a href="index.html">
        <button class="HomeBtn">Back to home</button>
        </a>
        `;
    }
};

generateCartItems();


let increment = (id) => {
    let selectedItem = id;
    let search = basket.find((y) => y.id === selectedItem.id);

    if(search === undefined){
        basket.push({
            id: selectedItem.id,
            item: 1,
        });
    } else {
       search.item += 1;
        }

    generateCartItems();
     update(selectedItem.id);

    localStorage.setItem("data", JSON.stringify (basket));
    };
    
        

let decrement = (id) => {
    let selectedItem = id;
    let search = basket.find((y) => y.id === selectedItem.id);

    if( search===undefined) return
    else if(search.item === 0)  return;
            else {
       search.item -= 1;
        }
        basket = basket.filter((y)=> y.item !==0 );

        generateCartItems();
        // TotalAmount();

        update(selectedItem.id);

        localStorage.setItem("data", JSON.stringify (basket));

};

let update = (id) => {
    let search = basket.find((t) => t.id === id);
//console.log(search.item);
document.getElementById(id).innerHTML = search.item;
calculation ();
TotalAmount();
};

let removeItem = (id)=>{
    let selectedItem = id;
    // console.log(selectedItem.id);
    basket = basket.filter((y) => y.id !== selectedItem.id);
    generateCartItems();
    calculation ();
    TotalAmount();
    
    localStorage.setItem("data", JSON.stringify(basket));
};

let clearCart =() =>{
    basket =[]
    generateCartItems();
    calculation ();
    localStorage.setItem("data", JSON.stringify(basket));
}

let TotalAmount = () => {
    if (basket.length !== 0) {
      let amount = basket
        .map((y) => {
          let { item, id } = y;
          let search = shopItemsData.find((t) => t.id === id) || [];
  
          return item * search.price;
        })
        .reduce((x, y) => x + y, 0);
      // console.log(amount);
      label.innerHTML = `
      <h2>Total Bill : $ ${amount}</h2>
      <button class="checkout">Checkout</button>
      <button onclick="clearCart()" class="removeAll">Clear Cart</button>
      `;
    } else return;
  };
  
  TotalAmount();