let shop = document.getElementById('shop');


let basket = JSON.parse(localStorage.getItem("data")) || []  

let generateShop = () => {
return (shop.innerHTML = shopItemsData.map((y)=>{
    let {id, name, price, desc, img} = y;
    let search = basket.find((y) => y.id === id)|| [];
    return `
 <div id=product-id-${id} class="item">
    <img width="200" src=${img} alt="">
    <div class="details">
        <h3>${name}</h3>
        <p>${desc}</p>
        <div class="price-quantity">
            <h2>$ ${price}</h2>
            <div class="butttons">
                <i onclick="decrement(${id})" class="bi bi-dash-lg"></i>
                <div id=${id} class="quantity">
                ${search.item === undefined? 0 : search.item}
                </div>
                <i  onclick="increment(${id})" class="bi bi-plus-lg"></i>
            </div>
        </div>
    </div>
</div> 
    `;
}).join(""));
};

generateShop();

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
        localStorage.setItem("data", JSON.stringify (basket));
    
   //console.log(basket);
    update(selectedItem.id);
};

let decrement = (id) => {
    let selectedItem = id;
    let search = basket.find((y) => y.id === selectedItem.id);

    if( search===undefined) return
    else if(search.item === 0)  return;
            else {
       search.item -= 1;
        }
        update(selectedItem.id);

        basket = basket.filter((y)=> y.item !==0 );

        //console.log(basket);
        localStorage.setItem("data", JSON.stringify (basket));

};

let update = (id) => {
    let search = basket.find((y) => y.id === id);
//console.log(search.item);
document.getElementById(id).innerHTML = search.item;
calculation ();
};

let calculation = () => {
    let cartIcon = document.getElementById("cartAmount");
    cartIcon.innerHTML= basket.map((y) => y.item).reduce((x, y) => x + y, 0);
    
};

calculation ();

