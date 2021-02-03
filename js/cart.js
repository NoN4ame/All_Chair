const cart = [];
const promo = ['2021'];
// Вешаем обработчик на элемент "Корзина"
document.getElementById('cart').addEventListener('click', () => {
    // При клике создаем шаблон для корзины
    document.querySelector('main').insertAdjacentHTML('beforeend',
        `<div class="invisible">
                    <div class="cart">
                    <h1>КОРЗИНА</h1>
                    <img class="close" src="../img/other/close.svg" alt="close">
                  </div>
            </div>`)
    if (cart.length === 0) {
        emptyCart()
        triggers()
    } else {
        renderCart()
        totalPrice()
        triggers()
    }
quantity()
})
const quantity = () => {
    let cartItem = document.querySelectorAll('.cart-item')
    let plus = document.querySelectorAll('.plus')
    let minus =document.querySelectorAll('.minus')
    for (let i = 0; i < cartItem.length; i++) {
        cartItem[i].addEventListener('click', (e) => {
            console.log(e.target)
            console.log(cart[i].id);
            if (e.target === plus[i] && cart[i].quantity < 4){
                cart[i].quantity++
                console.log(cart[i].quantity)
            } else if (e.target === minus[i] && cart[i].quantity >= 1){
                cart[i].quantity--
                if (cart[i].quantity === 0) {
                    cartItem[i].remove()
                    cart.splice([i],1)
                    console.log([i].length);
                }
            }
        })
    }
}
quantity()
// Отрисовка шаблона
const renderCart = () => {
    for (let i = 0; i < cart.length; i++) {
        document.querySelector('.cart').insertAdjacentHTML("beforeend", `<div class="cart-item">
               <img class="item-img" src="${cart[i].img}" alt="product">
                <ul>
                    <li class="cart-item__name">${cart[i].name}</li>
                    <li class="cart-item__vendorCode">${cart[i].vendorCode}</li>
                </ul>
               <section class="cart-item__quantity">
                    <span class="minus">-</span>
                    <p class="quantity-result">${cart[i].quantity}</p>
                    <span class="plus">+</span>
               </section>
               <section class="sales"></section>
               <p class="cart-item__price">${cart[i].price}</p>
               <span class="cart-item__delete">
               <p><span class="delete">+</span></p>
               </span>
               </div>`)
    }
}
// Корзина пуста
const emptyCart = () => {
    document.querySelector('.cart').insertAdjacentHTML('beforeend',
        `<p class="empty-cart">Корзина Пуста</p>
                                          <a href="../templates/catalog.html">
                                              <button>В каталог</button>
                                          </a>`)
}
// Общая сумма
function totalPrice() {
    // Нижняя часть корзины
    let sum = 0;
    let totalSum = cart.reduce((a, b) => a + b.totalPrice, sum);
    // Рендер нижней части корзины (Промокод, Цены)
    document.querySelector('.cart').insertAdjacentHTML('beforeend',
        `<div class="cart-bottom">
                <section class="promo-code">
                    <input id="promoCodeValue" type="text" placeholder="Промокод" value="">
                </section>
                <section class="result">
                    <section><p>Скидка: <p class="sales-result"></p></p></section>
                    <section><p>Промокод: <p class="promo-code-result"></p></p></section>
                    <section><p>К ОПЛАТЕ: <p class="total-price">${totalSum.toLocaleString()} &#8381;</p></p></section>
                    <button>ПЕРЕЙТИ К ОФОРМЛЕНИЮ ЗАКАЗА</button>
                </section>
            </div>`)
    // Вызов метода, промокода и скидок
}

function styleCard() {
    document.querySelector('body').style.backgroundColor = 'rgba(0, 0, 0, 0.5)'
    document.querySelector('header').style.filter = 'brightness(0.5)'
    document.querySelectorAll('.container')
        .forEach(div => div.style.filter = 'brightness(0.5)')
    document.querySelectorAll('.container')[0].style.filter = 'none'
}

function triggers() {
    styleCard()
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