const cart = [];
// Вешаем обработчик на элемент "Корзина"
document.getElementById('cart').addEventListener('click', () => {
    // При клике создаем шаблон для корзины
    document.querySelector('main').insertAdjacentHTML('beforeend',
        `<div class="invisible">
                    <div class="cart">
                    <h1>КОРЗИНА</h1>
                    <img class="close" src="../img/other/close.svg" alt="close">
                    <hr>
                  </div>
            </div>`)
    // Проверяем, если корзина пуста, то выводим пустой шаблон
    if (cart.length === 0) {
        document.querySelector('.cart').insertAdjacentHTML('beforeend',
            `
                    <p class="empty-cart">Корзина Пуста</p>
                    <a href="../templates/catalog.html">
                        <button>В каталог</button>
                    </a>
                `)
        // Вызов стилей для заднего фона
        this.styleCard()
        // Вызов событий для закрывания окна корзины
        this.triggers()
        // Если корзина не пуста, то выводим товары в корзине
    } else if (cart.length > 0) {
        renderCartProduct(cart)
        this.styleCard()
        this.triggers()
        document.querySelector('.cart').insertAdjacentHTML('beforeend',
            `<hr>
            <div>
                <section class="promo-code">
                    <input type="text" placeholder="Промокод">
                </section>
                <section class="result">
                    <section><p>Скидка: <p class="sales"></p></p></section>
                    <section><p>Промокод: <p class="promo-code-result"></p></p></section>
                    <section><p>К ОПЛАТЕ: <p class="total-price"></p></p></section>
                    <button>ПЕРЕЙТИ К ОФОРМЛЕНИЮ ЗАКАЗА</button>
                </section>
            </div>
        `)
    }

})
let cartItems = (img, name, vendorCode, price) => {
   return `   <div class="cart-item">
               <img class="item-img" src="${img}" alt="product">
                <ul>
                    <li class="cart-item__name">${name}</li>
                    <li class="cart-item__vendorCode">${vendorCode}</li>
                </ul>
               <section class="cart-item__quantity">
                    <span id="plus">+</span>
                    <p class="quantity-result">1</p>
                    <span id="minus">-</span>
               </section>
               <p class="cart-item__price">${price}</p>
               <span>
                     <img class="cart-item__delete" src="../img/other/del_product.svg" alt="del">
               </span>
           </div>`
}
const renderCartProduct = list => {
    const productList = list.map(item => cartItems(item.img,item.name,item.vendorCode,item.price));
    document.querySelector('.cart').insertAdjacentHTML('beforeend', productList.join(''))
}
function styleCard() {
    document.querySelector('body').style.backgroundColor = 'rgba(0, 0, 0, 0.5)'
    document.querySelector('header').style.filter = 'brightness(0.5)'
    document.querySelectorAll('.container')
        .forEach(div => div.style.filter = 'brightness(0.5)')
    document.querySelectorAll('.container')[0].style.filter = 'none'
}
function triggers() {
    // Получаем блок обертку
    let card = document.querySelector('.invisible');
    // Вешаем на него обработчик событий
    card.addEventListener('click', (e) => {
        // Если клик был по блоку или на иконку 'X', то закрываем карточку товара
        if (e.target === document.querySelector('.close')
            || e.target === document.querySelector('.invisible')) {
            document.querySelector('.cart').remove()
            document.querySelector('.invisible').remove()
            document.querySelector('body').style.backgroundColor = 'transparent'
            document.querySelector('header').style.filter = 'none'
            document.querySelectorAll('.container')
                .forEach(div => div.style.filter = 'none')
        }
    })
    // Вешаем обработчик при наведении
    card.addEventListener('mouseover', (e) => {
        // Если наведение было по иконке 'X'
        if (e.target === document.querySelector('.close')) {
            // Меняем ее на иконку розового цвета
            document.querySelector('.close').src = '../img/other/close-pink.svg'
            // Если курсор не на иконке, то оставляем стандартную иконку
        } else document.querySelector('.close').src = '../img/other/close.svg'
    })
}
