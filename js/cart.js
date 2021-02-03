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
        triggers()
        cartBottom()
    }
    quantity()
    delChoice()
})
const quantity = () => {
    let cartItem = document.querySelectorAll('.cart-item')
    cartItem.forEach(el => el.addEventListener('click', (e) => {
        let plus = el.querySelector('.plus');
        let minus = el.querySelector('.minus');
        let find = cart.find(item => item.name === el.querySelector('.cart-item__name').textContent);
        if (e.target === plus && find.quantity < 4) {
            find.quantity++
            find.totalPrice = find.price * find.quantity
            el.querySelector('.quantity-result').innerHTML = String(find.quantity)
            // Нижняя часть корзины
            let sum = 0;
            let totalSum = cart.reduce((a,b) => a + b.totalPrice, sum);
            totalPrice()
        } else if (e.target === minus && find.quantity > 1) {
            find.quantity--
            el.querySelector('.quantity-result').innerHTML = String(find.quantity)
            find.totalPrice = find.price * find.quantity
            // Нижняя часть корзины
            totalPrice()

        }
    }))
}
const delChoice = () => {
    let cartItem = document.querySelectorAll('.cart-item')
    cartItem.forEach(el => el.addEventListener('click', (e) => {
        let remove = el.querySelector('.delete')
        if (e.target === remove) {
            el.insertAdjacentHTML('beforeend', `
                <div class="delete-block">
                     <div class="delete-block-filter"></div>
                        <div class="delete-block_text">
                            <p class="delete_submit">Удалить</p>
                            <p class="return_inCart">Вернуть в корзину</p>
                        </div>
                    </div>`);
        }
        delItem(el)
    }))
}
const delItem = (cartItem) => {
    let delBlock = document.querySelectorAll('.delete-block')
    delBlock.forEach(item => item.addEventListener('click', (e) => {
        let returnInCart = item.querySelector('.return_inCart')
        let delSubmit = item.querySelector('.delete_submit')
        if (e.target === returnInCart) {
            item.remove()
        } else if (e.target === delSubmit) {
            cartItem.remove()
            let index = cart.findIndex(n => n.name === cartItem.querySelector('.cart-item__name').textContent)
            if (index !== -1) {
                cart.splice(index, 1)
            }
            let quantity = document.querySelector('.quantity');
            quantity.innerHTML = String(cart.length)
            totalPrice()
            if (cart.length === 0) {
                cartItem.remove()
                quantity.remove()
                document.querySelector('.cart-bottom').remove()
                emptyCart()
            }
        }
    }))
}
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
               <p class="cart-item__price">${(cart[i].price).toLocaleString()} &#8381;</p>
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
const totalPrice = () => {
    let sum = 0;
    let totalSum = cart.reduce((a,b) => a + b.totalPrice, sum);
    document.querySelector('.total-price').innerHTML = `${totalSum.toLocaleString()}  &#8381;`
}
// Общая сумма
function cartBottom() {
    // Нижняя часть корзины
    let sum = 0;
    let totalSum = cart.reduce((a,b) => a + b.totalPrice, sum);
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
    promoCode()
    // Вызов метода, промокода и скидок
}
function promoCode() {
    let codeValue = document.getElementById('promoCodeValue')
    if (codeValue.value === promo[0]) {
        let sum = 0;
        let totalSum = cart.reduce((a, b) => a + b.totalPrice, sum);
        let discount = (totalSum * 0.2);
        codeValue.value = promo[0]
        document.querySelector('.promo-code-result').innerHTML = `${discount.toLocaleString()}  &#8381;`
        document.querySelector('.total-price').innerHTML = `${totalSum - discount} &#8381; `
    }
    codeValue.addEventListener('keyup', () => {
        if (codeValue.value === promo[0]) {
            let sum = 0;
            let totalSum = cart.reduce((a, b) => a + b.totalPrice, sum);
            let discount = (totalSum * 0.2);
            document.querySelector('.promo-code-result').innerHTML = `${discount.toLocaleString()}  &#8381;`
            document.querySelector('.total-price').innerHTML = `${totalSum - discount} &#8381; `
            codeValue.innerHTML = promo[0]
        } else return false
    })
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