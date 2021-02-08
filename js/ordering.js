const ordering = {
    init() {
        this.render()
    },
    render() {
        document.getElementById('ordering').addEventListener('click', () => {
            document.querySelector('.cart').remove()
            document.querySelector('.invisible').insertAdjacentHTML('beforeend',
                `<div class="order">
                        <img class="close" src="../img/other/close.svg" alt="">
                        <a href="#">Вернуться в корзину</a>
                        <h1>ОФОРМЛЕНИЕ ЗАКАЗА</h1>
                        <form action="#">
                        <p>СПОСОБ ПОЛУЧЕНИЯ</p>
                            <div class="order__content">
                                <section class="chooseDelivery">
                                <ul>
                                    <li>
                                        <input type="radio" name="delivery" id="delivery" value="Доставка" checked>
                                        <label for="delivery">Доставка</label></li>
                                    <li>
                                        <input type="radio" name="delivery" id="pickup" value="Самовывоз">
                                        <label for="pickup">Самовывоз</label>
                                    </li>
                                </ul>
                                </section>
                                <section class="deliveryDetails">
                                    <p>При оформлении Доставки для уточнения
                                    даты и времени доставки с вами свяжется
                                    оператор. Если в течение 1 часа вам
                                    не перезвонили, свяжитесь с нами
                                    по телефону +1 123 456 78 90</p>
                                </section>
                            </div>
                                <div class="aboutRecipient">
                                    <section class="recipient">
                                    <p class="aboutRecipient__text">Данные получателя:</p>
                                    <ul>
                                    <li><input type="text" placeholder="Имя" name="contact" id="name"></li>
                                    <li><input type="number" placeholder="Телефон" name="contact" id="phone"></li>
                                    </ul>
                                    </section>
                                    <section class="address">
                                    <p class="aboutRecipient__text">Адрес получателя:</p>
                                    <ul>
                                    <li><input type="text" placeholder="Город" name="deliveryForm" id="city"></li>
                                    <li><input type="text" placeholder="Улица" name="deliveryForm" id="street"></li>
                                    <li><input type="text" placeholder="Дом" name="deliveryForm" id="houseNumber"></li>
                                    <li><input type="text" placeholder="Квартира/офис" name="deliveryForm" id="apartment"></li>
                                    </ul>
                                    </section>
                                </div>
                                <div class="payment">
                                <p>СПОСОБ ОПЛАТЫ</p>
                                <input type="radio" name="payment" id="cash" value="Наличными при получении" checked>
                                <label for="cash">Наличными при получении</label>
                                <input type="radio" name="payment" id="card" value="Картой">
                                <label for="card">Картой</label>
                                </div>
                                <div class="totalSum">
                                <p>К ОПЛАТЕ: 3000 р</p>
                                <button type="submit">Оформить</button>
                                </div>
                        </form>
                      </div>`)
        })
        scroll(document.querySelector('.order'))
    },
    delivery() {

    },
    scroll () {
    if (cart.length >= 3) {
        item.style.overflowY = 'scroll'
        item.style.top = '3.5%'
        item.style.height = '775px'
        item.style.overflowX = 'none'
    } else item.style.height = 'auto'
}
}
