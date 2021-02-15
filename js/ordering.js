const ordering = {
    init() {
        this.render()
    },
    render() {
        document.getElementById('ordering').addEventListener('click', () => {
            //
            let totalPrice = (document.querySelector('.total-price').textContent)
            document.querySelector('.cart').remove()
            document.querySelector('.invisible').insertAdjacentHTML('beforeend',
                `<div class="order">
                        <img class="close" src="../img/other/close.svg" alt="">
                        <a href="#">Вернуться в корзину</a>
                        <h1>ОФОРМЛЕНИЕ ЗАКАЗА</h1>
                        <form id="formResult" action="#">
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
                                    <p class="deliveryDetails_text"></p>
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
                                <p>К ОПЛАТЕ: <span class="total-pr">${totalPrice}</span></p>
                                <button id="submit" class="btn">Оформить</button>
                                </div>
                        </form>
                      </div>`)
            this.scroll()
            this.choice()
            this.formSubm()
        })
    },
    delivery() {
        document.querySelector('.aboutRecipient').insertAdjacentHTML('beforeend',
            `                  <section class="address">
                                    <p class="aboutRecipient__text">Адрес получателя:</p>
                                    <ul>
                                    <li><input type="text" placeholder="Город" name="deliveryCity" id="city"></li>
                                    <li><input type="text" placeholder="Улица" name="deliveryStreet" id="street"></li>
                                    <li><input type="text" placeholder="Дом" name="deliveryHouseNumber" id="houseNumber"></li>
                                    <li><input type="text" placeholder="Квартира/офис" name="deliveryApartament" id="apartment"></li>
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
                                            <a href="https://goo.gl/maps/yb1yx2LxuXiY7o7S7" target="_blank"><img src="../img/other/map.jpg" alt=""></a>
                                        </li>
                                    </ul>
                                    </section>`)
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
        let choice = document.querySelectorAll('.custom-radio')
        choice.forEach(item => item.addEventListener('click', (e) => {
                if (!document.querySelector('.our-address') && document.getElementById('pickup').checked) {
                    this.pickup()
                    document.querySelector('.deliveryDetails_text').textContent = `При оформлении Самовывоза для
                     уточнения товара в наличии с вами
                     свяжется оператор. Если в течение 1 часа
                     вам не перезвонили, свяжитесь с нами
                     по телефону +1 123 456 78 90`
                        if (document.querySelector('.address')) {
                            document.querySelector('.address').remove()
                        }
                } else if (!document.querySelector('.address') && document.getElementById('delivery').checked) {
                    this.delivery()
                    document.querySelector('.deliveryDetails_text').textContent = `При оформлении Доставки для уточнения
                                    даты и времени доставки с вами свяжется
                                    оператор. Если в течение 1 часа вам
                                    не перезвонили, свяжитесь с нами
                                    по телефону +1 123 456 78 90`
                        if (document.querySelector('.our-address')) {
                            document.querySelector('.our-address').remove()
                        }
                }
            }
        ))
    },
    form(){
        let forma = document.getElementById('formResult')

    },
    formSubm (){
        document.getElementById('submit').addEventListener('click', (e) => {
            e.preventDefault()
            this.form()
        })
    }
}
