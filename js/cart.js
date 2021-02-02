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
        renderCartItem()
        // Счетчик общей суммы
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
        // Стили заднего фона при открытой корзине
        styleCard()
        // События по закрытию корзины
        triggers()
        // События для действий в корзине ( увеличить число товара, удалить товар, итоговая цена)
        quantityTriggers()
        removeItem()
    }
})
const renderCartItem = () => {
    for (let i = 0; i < cart.length; i++) {
        document.querySelector('.cart').insertAdjacentHTML('beforeend',
            `<div class="cart-item">
               <img class="item-img" src="${cart[i].img}" alt="product">
                <ul>
                    <li class="cart-item__name">${cart[i].name}</li>
                    <li class="cart-item__vendorCode">${cart[i].vendorCode}</li>
                </ul>
               <section class="cart-item__quantity">
                    <span  class="minus non-hover">-</span>
                    <p  class="quantity-result">${cart[i].quantity}</p>
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

// Увеличение кол-ва товаров и подсчет общей суммы
function quantityTriggers() {
    let cartItem = document.querySelectorAll('.cart-item')
    // Перебор всех товаров в корзине
    for (let j = 0; j < cartItem.length; j++) {
        // Кнопки
        let minus = document.querySelectorAll('.minus')
        let plus = document.querySelectorAll('.plus')
        cartItem[j].addEventListener('click', (e) => {
            if (e.target === plus[j] && cart[j].quantity < 4) {
                cart[j].quantity++
                // Общая стоимость товара
                cart[j].totalPrice = cart[j].quantity * cart[j].price
                let sum = 0;
                let totalSum = cart.reduce((a, b) => a + b.totalPrice, sum);
                document.querySelectorAll('.quantity-result')[j].innerHTML = cart[j].quantity
                document.querySelector('.total-price').innerHTML = `${totalSum.toLocaleString()} &#8381;`
            } else if (e.target === minus[j] && cart[j].quantity > 1) {
                cart[j].quantity--
                cart[j].totalPrice = cart[j].quantity * cart[j].price
                let sum = 0;
                let totalSum = cart.reduce((a, b) => a + b.totalPrice, sum);
                document.querySelectorAll('.quantity-result')[j].innerHTML = cart[j].quantity
                document.querySelector('.total-price').innerHTML = `${totalSum.toLocaleString()} &#8381;`
            }
        })
    }
}
// Удаление товаров
function removeItem() {
    let cartItem = document.querySelectorAll('.cart-item')
    let remove = document.querySelectorAll('.delete')
    for (let i = 0; i < cartItem.length; i++) {
        cartItem[i].addEventListener('click', (e) => {
            // При нажатии на удалить выводим плашку с вариантами
            if (e.target === remove[i]) {
                cartItem[i].insertAdjacentHTML('beforeend', `
                <div class="delete-block">
                     <div class="delete-block-filter"></div>
                        <div class="delete-block_text">
                            <p class="delete_submit">Удалить</p>
                            <p class="return_inCart">Вернуть в корзину</p>
                        </div>
                    </div>`);
                // Плашка с дальнейшими вариантами действий
                let delBlock = document.querySelectorAll('.delete-block')
                for (let j = 0; j < delBlock.length; j++) {
                    delBlock[j].addEventListener('click', (e) => {
                        // При нажатии на вернуть в корзину, товар возвращается
                        if (e.target === document.querySelectorAll('.return_inCart')[j]) {
                            document.querySelectorAll('.delete-block')[j].remove()
                            // При нажатии на удалить удаляем товар из массива
                        } else if (e.target === document.querySelectorAll('.delete_submit')[j]) {
                            // Удаляем товар сначала в HTML потом в массиве
                            cartItem[i].remove()
                            cart.splice([j], 1)
                            // Находим кол-во товара над вкладкой корзина и выводим оставшееся кол-во товара
                            let quantity = document.querySelector('.quantity');
                            quantity.innerHTML = cart.length;
                            // После удаления пересчитываем общую сумму товаров в корзине и выводим в HTML
                            let sum = 0;
                            let totalSum = cart.reduce((a, b) => a + b.totalPrice, sum);
                            document.querySelector('.total-price').innerHTML = `${totalSum.toLocaleString()} &#8381;`
                            // Если корзина пуста удаляем все элементы и выводим шаблон о том что корзина пуста
                            if (cart.length === 0) {
                                cartItem[i].remove()
                                document.querySelector('.cart-bottom').remove()
                                document.querySelector('.quantity').remove()
                                document.querySelector('.cart').insertAdjacentHTML('beforeend',
                                    `<p class="empty-cart">Корзина Пуста</p>
                                          <a href="../templates/catalog.html">
                                              <button>В каталог</button>
                                          </a>`)
                                return cart
                            }
                        }
                    })
                }
            }
        })
    }
}

// Промокод и скидка
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


// НОВАЯ ВЕТКА БЛЯТЬ



