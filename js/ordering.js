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
                        <p class="headers">СПОСОБ ПОЛУЧЕНИЯ</p>
                            <div class="order__content">
                                <section class="chooseDelivery">
                                <ul>
                                    <li>
                                        <input class="custom-radio" type="radio" name="delivery" id="delivery" value="Доставка">
                                        <label for="delivery">Доставка</label></li>
                                    <li>
                                        <input class="custom-radio" type="radio" name="delivery" id="pickup" value="Самовывоз">
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
                                </div>
                                <div class="payment">
                                <p class="headers">СПОСОБ ОПЛАТЫ</p>
                                <ul>
                                <li><input class="custom-radio" type="radio" name="payment" id="cash" value="Наличными при получении">
                                <label for="cash">Наличными при получении</label></li>
                                <li><input class="custom-radio" type="radio" name="payment" id="card" value="Картой">
                                <label for="card">Картой</label></li>
                                </ul>
                                </div>
                                <div class="totalSum">
                                <p>К ОПЛАТЕ: <span>3000 р</span></p>
                                <button class="btn" type="submit">Оформить</button>
                                </div>
                        </form>
                      </div>`)
            this.scroll()
            this.choice()
        })
    },
    delivery() {
        document.querySelector('.aboutRecipient').insertAdjacentHTML('beforeend',
            `                  <section class="address">
                                    <p class="aboutRecipient__text">Адрес получателя:</p>
                                    <ul>
                                    <li><input type="text" placeholder="Город" name="deliveryForm" id="city"></li>
                                    <li><input type="text" placeholder="Улица" name="deliveryForm" id="street"></li>
                                    <li><input type="text" placeholder="Дом" name="deliveryForm" id="houseNumber"></li>
                                    <li><input type="text" placeholder="Квартира/офис" name="deliveryForm" id="apartment"></li>
                                    </ul>
                                `)
    },
    pickup() {
        document.querySelector('.aboutRecipient').insertAdjacentHTML('beforeend',
            `
                                    <section class="our-address">
                                    <p class="aboutRecipient__text">Пункт самовывоза:</p>
                                    <ul>
                                        <li>
                                            <img src="../img/other/marker.svg" alt="marker">
                                            <p>Москва, ул. Арбат, д. 29</p>
                                        </li>
                                        <li>
                                            <p>Пн-пт с 9:00 до 20:00</p>
                                        </li>
                                        <li>
                                            <p>+1 123 456 78 90</p>
                                        </li>
                                        <li>
                                            <img src="" alt="">
                                        </li>
                                    </ul>
                                    </section>
                                `)
    },
    scroll() {
        let orderBlock = document.querySelector('.order');
        orderBlock.style.overflowY = 'scroll'
        orderBlock.style.top = '3.5%'
        orderBlock.style.height = '775px'
        orderBlock.style.overflowX = 'none'
        document.body.style.overflow = 'hidden'
    },
    choice() {
        let choise = document.querySelectorAll('.custom-radio')
        choise.forEach(item => item.addEventListener('click', (e) => {
                if (!document.querySelector('.our-address') && document.getElementById('pickup').checked) {
                    this.pickup()
                        if (document.querySelector('.address')) {
                            document.querySelector('.address').remove()
                        }
                } else if (!document.querySelector('.address') && document.getElementById('delivery').checked) {
                    this.delivery()
                        if (document.querySelector('.our-address')) {
                            document.querySelector('.our-address').remove()
                        }
                }
            }
        ))
    }
}