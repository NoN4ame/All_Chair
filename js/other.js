let cartItems = (img, name, quantity, vendorCode, price) => {
    return `   <div class="cart-item">
               <img class="item-img" src="${img}" alt="product">
                <ul>
                    <li class="cart-item__name">${name}</li>
                    <li class="cart-item__vendorCode">${vendorCode}</li>
                </ul>
               <section class="cart-item__quantity">
                    <span class="minus">-</span>
                    <p class="quantity-result">${quantity}</p>
                    <span class="plus">+</span>
               </section>
               <section class="sales"></section>
               <p class="cart-item__price">${price}</p>
               <span class="cart-item__delete">
               <p><span class="delete">+</span></p>
               </span>
               </div>`
}
const renderCartProduct = list => {
    const productList = list.map(item => cartItems(item.img, item.name, item.quantity, item.vendorCode, item.price));
    document.querySelector('.cart').insertAdjacentHTML('beforeend', productList.join(''))
}

// Работа с корзиной
function quantity() {
    let plus = document.querySelectorAll('.plus')
    let minus = document.querySelectorAll('.minus')
    for (let i = 0; i < cart.length; i++){
        let cartItem = document.querySelectorAll('.cart-item')
        test(cartItem)
        cartItem[i].addEventListener('click', (e) => {
            if (e.target === plus[i] && cart[i].quantity < 4){
                cart[i].quantity++
                document.querySelectorAll('.quantity-result')[i].innerHTML = cart[i].quantity
            } else if (e.target === minus[i] && cart[i].quantity >= 1){
                cart[i].quantity--
                document.querySelectorAll('.quantity-result')[i].innerHTML = cart[i].quantity
                if (cart[i].quantity === 0){
                    delete cart[i]
                    cartItem[i].remove()
                }
            }
        })
    }
}
// Вывод пустой корзины
const emptyCart = () => {
    document.querySelector('.cart').insertAdjacentHTML('beforeend',
        `<p class="empty-cart">Корзина Пуста</p>
                                          <a href="../templates/catalog.html">
                                              <button>В каталог</button>
                                          </a>`)
}
// Стили заднего фона при открытой корзине
function _render (){
    renderCartProduct(cart)
    triggers()
    totalPrice()
    quantity()
}

function styleCard() {
    document.querySelector('body').style.backgroundColor = 'rgba(0, 0, 0, 0.5)'
    document.querySelector('header').style.filter = 'brightness(0.5)'
    document.querySelectorAll('.container')
        .forEach(div => div.style.filter = 'brightness(0.5)')
    document.querySelectorAll('.container')[0].style.filter = 'none'
}
// События по закрытию корзины
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
// Промокод и скидка


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
    promoCode()
}

// НОВАЯ ВЕТКА
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
                            }
                        }
                    })
                }
            }
        })
    }
}