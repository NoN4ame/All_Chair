let cart = [];
const promo = ['2021', '2020'];
// Вешаем обработчик на элемент "Корзина"
cartCounter()
document.getElementById('cart').addEventListener('click', cartInit)

// При клике создаем шаблон для корзины
function cartInit() {
    localData()
    document.querySelector('main').insertAdjacentHTML('beforeend',
        `<div class="invisible">
                    <div class="cart">
                    <h1>КОРЗИНА</h1>
                    <img class="close" src="img/other/close.svg" alt="close">
                  </div>
            </div>`)
    if (localStorage.key(0) === 'array') {
        cart = JSON.parse(localStorage.getItem('array'))
        renderCart()
    } else {
        if (cart.length === 0) {
            emptyCart()
            triggers()
        } else {
            renderCart()
        }
    }
}

// Отрисовка шаблона
const renderCart = () => {
    for (let i = 0; i < cart.length; i++) {
        document.querySelector('.cart').insertAdjacentHTML("beforeend",
            `<div class="cart-item">
                    <img class="item-img" src="${cart[i].img}" alt="product">
                        <ul>
                            <li class="cart-item__name">${cart[i].name}</li>
                            <li class="cart-item__vendorCode">${cart[i].vendorCode}</li>
                        </ul>
                    <section class="cart-item__quantity">
                         <span class="minus block">-</span>
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
    triggers()
    cartBottom()
    order()
    localData()
    quantity()
    delChoice()
}
// Подсчет кол-ва товаров и вывод суммы с учетом кол-ва
const quantity = () => {
    let cartItem = document.querySelectorAll('.cart-item')
    cartItem.forEach(el => el.addEventListener('click', (e) => {
        let plus = el.querySelector('.plus');
        let minus = el.querySelector('.minus');
        let find = cart.find(item => item.vendorCode === el.querySelector('.cart-item__vendorCode').textContent);
        if (e.target === plus && find.quantity < 4) {
            find.quantity++
            find.totalPrice = find.price * find.quantity
            el.querySelector('.quantity-result').innerHTML = String(find.quantity)
            // Нижняя часть корзины
            totalPrice()
            discount()
            // Стили кнопок + и -
            // Если кол-во равно 4 то добавляем класс 'block' кнопке +
            if (find.quantity === 4) {
                plus.classList.add('block')
                // Если кол-во больше 1 то удаляем класс 'block' кнопке -
            } else if (find.quantity > 1) {
                minus.classList.remove('block')
            }
        } else if (e.target === minus && find.quantity > 1) {
            find.quantity--
            el.querySelector('.quantity-result').innerHTML = String(find.quantity)
            find.totalPrice = find.price * find.quantity
            // Нижняя часть корзины
            totalPrice()
            discount()
            // Стили кнопок + и -
            // Если кол-во равно 1 то добавляем класс 'block' кнопке -
            if (find.quantity === 1) {
                minus.classList.add('block')
                // Если кол-во меньше 4 то удаляем класс 'block' кнопке +
            } else if (find.quantity < 4) {
                plus.classList.remove('block')
            }
        }
    }))
}
// При клике на кнопку удалить, выводим плашку для подтверждения удаления или возврата товара в корзину
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
        // Вызываем метод удаления эл-та
        delItem(el)
    }))
}
// Удаление товара из корзины, возврат товара в корзину
const delItem = (cartItem) => {
    let delBlock = document.querySelectorAll('.delete-block')
    delBlock.forEach(item => item.addEventListener('click', (e) => {
        let returnInCart = item.querySelector('.return_inCart')
        let delSubmit = item.querySelector('.delete_submit')
        // Если клик по "Вернуть в корзину", то удаляем плашку с выбором
        if (e.target === returnInCart) {
            item.remove()
            // Если по удалить
        } else if (e.target === delSubmit) {
            // Удаляем товар сначала HTML
            cartItem.remove()
            // Находим совпадение по имени товара в массиве
            let index = cart.findIndex(n => n.vendorCode === cartItem.querySelector('.cart-item__vendorCode').textContent)
            if (index !== -1) {
                // Если нашли, то удаляем
                cart.splice(index, 1)
                localData()
            }
            // После удаления меням кол-во товара в корзине и считаем общую стоимость
            let quantity = document.querySelector('.quantity');
            quantity.innerHTML = String(cart.length)
            totalPrice()
            discount()
            // Если в массиве ни чего нет, выводим шаблон пустой корзины
            if (cart.length === 0) {
                cartItem.remove()
                quantity.remove()
                document.querySelector('.cart-bottom').remove()
                emptyCart()
                removeData()
            }
        }
    }))
    scroll()
}
// Корзина пуста
const emptyCart = () => {
    document.querySelector('.cart').insertAdjacentHTML('beforeend',
        `<p class="empty-cart">Корзина Пуста</p>
                                          <a href="catalog.html">
                                              <button class="btn">В каталог</button>
                                          </a>`)
}
//Подсчет общей суммы
const totalPrice = () => {
    let sum = 0;
    let totalSum = cart.reduce((a, b) => a + b.totalPrice, sum);
    document.querySelector('.total-price').innerHTML = `${totalSum.toLocaleString()}  &#8381;`
}

// Нижняя часть корзины
function cartBottom() {
    // Подсчет общей суммы товаров в массиве без учета кол-ва
    let sum = 0;
    let totalSum = cart.reduce((a, b) => a + b.totalPrice, sum);
    let findDiscount = cart.filter(item => item.currentDiscount)
    let totalDiscount = findDiscount.reduce((a, b) => a + b.currentDiscount, sum)
    // Рендер нижней части корзины (Промокод, Цены)
    document.querySelector('.cart').insertAdjacentHTML('beforeend',
        `<div class="cart-bottom">
                <section class="promo-code">
                    <input id="promoCodeValue" type="text" placeholder="Промокод" value="" maxlength="4">
                </section>
                <section class="result">
                    <section><p>Скидка: <p class="sales-result">${totalDiscount.toLocaleString()} &#8381;</p></p></section>
                    <section><p>Промокод: <p class="promo-code-result"></p></p></section>
                    <section><p>К ОПЛАТЕ: <p class="total-price">${totalSum.toLocaleString()} &#8381;</p></p></section>
                    <button class="btn" id="ordering">ПЕРЕЙТИ К ОФОРМЛЕНИЮ ЗАКАЗА</button>
                </section>
            </div>`)
    if (totalDiscount === 0) {
        document.querySelector('.sales-result').style.display = 'none'
    }
    // Вызов метода, промокода
    promoCode()
}

// Расчет скидки
function discount() {
    let findDiscount = cart.filter(item => item.currentDiscount)
    findDiscount.forEach((el) => {
        el.currentDiscount = (el.oldPrice * el.quantity) - el.totalPrice
    })
    let sum = 0
    let totalDiscount = findDiscount.reduce((a, b) => a + b.currentDiscount, sum)
    document.querySelector('.sales-result').innerHTML = `${totalDiscount.toLocaleString()}  &#8381;`
}

// Промокод для корзины
function promoCode() {
    let codeValue = document.getElementById('promoCodeValue')
    codeValue.addEventListener('keyup', () => {
        // Ищем совпадение в массиве промокодов
        if (promo.indexOf(codeValue.value) !== -1 && codeValue.value.length === 4) {
            // Если нашли, то делаем расчет суммы с учетом промокода
            let sum = 0;
            let totalSum = cart.reduce((a, b) => a + b.totalPrice, sum);
            let discount = (totalSum * 0.2);
            document.querySelector('.promo-code-result').innerHTML = `${discount.toLocaleString()}  &#8381;`
            document.querySelector('.total-price').innerHTML = `${(totalSum - discount).toLocaleString()} &#8381; `
            // Если совпадение нет, то возвращаем все как было
        } else {
            document.querySelector('.promo-code-result').innerHTML = ``
            let sum = 0;
            let totalSum = cart.reduce((a, b) => a + b.totalPrice, sum);
            document.querySelector('.total-price').innerHTML = `${totalSum.toLocaleString()} &#8381; `
        }
    })
}

// События по закрытию корзины и карточек товара
function triggers() {
    prodCard.styleCard()
    scroll()
    if (document.querySelector('.new-collection')) {
        document.querySelector('.new-collection').style.filter = 'brightness(0.5)'
    }
    if (document.querySelector('.subscribe')) {
        document.querySelector('.subscribe').style.filter = 'brightness(0.5)'
    }
    // Получаем блок обертку
    let card = document.querySelector('.invisible');
    // Вешаем на него обработчик событий
    card.addEventListener('click', (e) => {
        // Если клик был по блоку или на иконку 'X', то закрываем карточку товара
        if (e.target === document.querySelector('.close')
            || e.target === document.querySelector('.invisible')) {
            prodCard.delStyle()
            localData()
        }
    })
    // Вешаем обработчик при наведении
    card.addEventListener('mouseover', (e) => {
        // Если наведение было по иконке 'X'
        if (e.target === document.querySelector('.close')) {
            // Меняем ее на иконку розового цвета
            document.querySelector('.close').src = 'img/other/close-pink.svg'
            // Если курсор не на иконке, то оставляем стандартную иконку
        } else document.querySelector('.close').src = 'img/other/close.svg'
    })
}

// Вертикальная прокрутка корзины если товаров 3 и больше
function scroll() {
    if (cart.length >= 3) {
        document.querySelector('.cart').style.overflowY = 'scroll'
        document.querySelector('.cart').style.top = '50%'
        document.querySelector('.cart').style.height = '775px'
        document.querySelector('.cart').style.overflowX = 'hidden'
        document.body.style.overflow = 'hidden'
    } else {
        document.querySelector('.cart').style.height = 'auto'
        document.querySelector('.cart').style.overflowY = 'hidden'
    }
}

// Переход на оформление заказа
function order() {
    ordering.init()
}

// Работа с локальными данными
function localData() {
    if (cart.length > 0) {
        let cartData = JSON.stringify(cart)
        localStorage.setItem('array', cartData)
    }
}

// Удаление хранилища
function removeData() {
    localStorage.removeItem('array')
}

// Подсчет кол-ва товара из локального хранилища
function cartCounter() {
    if (cart.length === 0 && localStorage.key(0) === 'array') {
        cart = JSON.parse(localStorage.getItem('array'))
        document.getElementById('cart').insertAdjacentHTML
        ('beforeend', `<span class="quantity"></span>`)
        document.querySelector('.quantity').innerHTML = cart.length
    }
}