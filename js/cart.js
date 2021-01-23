const cart = [];
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
        // Вызов рендера с товарами из корзины
        renderCartProduct(cart)
        // Счетчик общей суммы
        let sum = 0;
        let totalSum = cart.reduce((a, b) => a + b.price, sum);
        // Рендер нижней части корзины (Промокод, Цены)
        document.querySelector('.cart').insertAdjacentHTML('beforeend',
            `<div class="cart-bottom">
                <section class="promo-code">
                    <input type="text" placeholder="Промокод">
                </section>
                <section class="result">
                    <section><p>Скидка: <p class="sales-result">-1450 &#8381;</p></p></section>
                    <section><p>Промокод: <p class="promo-code-result">-350 &#8381;</p></p></section>
                    <section><p>К ОПЛАТЕ: <p class="total-price">${totalSum.toLocaleString()} &#8381;</p></p></section>
                    <button>ПЕРЕЙТИ К ОФОРМЛЕНИЮ ЗАКАЗА</button>
                </section>
            </div>`)
        // Стили заднего фона при открытой корзине
        styleCard()
        // События по закрытию корзины
        triggers()
        // События для действий в корзине ( увеличить число товара, удалить товар, итоговая цена)
        quantityTriggers()
    }
})


//Динамическая отрисовка шаблона товара в корзине, принимает из себя данные из массива
let cartItems = (img, name, vendorCode, quantity, price) => {
    return `   <div class="cart-item">
               <img class="item-img" src="${img}" alt="product">
                <ul>
                    <li class="cart-item__name">${name}</li>
                    <li class="cart-item__vendorCode">${vendorCode}</li>
                </ul>
               <section class="cart-item__quantity">
                    <span class="non-hover minus">-</span>
                    <p class="quantity-result">${quantity}</p>
                    <span class="plus">+</span>
               </section>
               <section class="sales"></section>
               <p class="cart-item__price">${price.toLocaleString()} &#8381;</p>
               <span class="cart-item__delete">
                <p>+</p>
               </span>
           </div>`
}
// Перебор массива корзины (list - принимает в себя массив товаров),(item - перебранный массив из которого получаем данные)
const renderCartProduct = list => {
    const productList = list.map(item => cartItems(item.img, item.name, item.vendorCode, item.quantity, item.price))
    document.querySelector('.cart').insertAdjacentHTML('beforeend', productList.join(''))
}

// Стили заднего фона при открытой корзине
function styleCard() {
    document.querySelector('body').style.backgroundColor = 'rgba(0, 0, 0, 0.5)'
    document.querySelector('header').style.filter = 'brightness(0.5)'
    document.querySelectorAll('.container')
        .forEach(div => div.style.filter = 'brightness(0.5)')
    document.querySelectorAll('.container')[0].style.filter = 'none'
}

// События по закрытию корзины
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

// События для действий в корзине ( увеличить число товара, удалить товар, итоговая цена)
function quantityTriggers() {
    let plus = document.querySelectorAll('.plus'),
        minus = document.querySelectorAll('.minus'),
        quantity = document.querySelectorAll('.quantity-result')

}
