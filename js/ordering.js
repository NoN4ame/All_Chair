const ordering = {
    init() {
        this.render()
    },
    render() {
        document.getElementById('ordering').addEventListener('click', () => {
            //Финальная цена
            let totalPrice = (document.querySelector('.total-price').textContent)
            document.querySelector('.cart').remove()
            document.querySelector('.invisible').insertAdjacentHTML('beforeend',
                `<div class="order">
                        <img class="close" src="../img/other/close.svg" alt="">
                        <a class="backCart" href="#">Вернуться в корзину</a>
                        <h1>ОФОРМЛЕНИЕ ЗАКАЗА</h1>
                        <form novalidate id="formResult" action="#">
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
            this.backCart()
        })
    },
    delivery() {
        document.querySelector('.aboutRecipient').insertAdjacentHTML('beforeend',
            ` <section class="address">
                        <p class="aboutRecipient__text">Адрес получателя:</p>
                        <ul>
                        <li><input type="text" placeholder="Город" name="deliveryCity" id="city"></li>
                        <li><input type="text" placeholder="Улица" name="deliveryStreet" id="street"></li>
                        <li><input type="text" placeholder="Дом" name="deliveryHouseNumber" id="houseNumber"></li>
                        <li><input type="text" placeholder="Квартира/офис" name="deliveryApartament" id="apartment"></li>
                        </ul>
                    </section>`)
    },
    pickup() {
        document.querySelector('.aboutRecipient').insertAdjacentHTML('beforeend',
            `<section class="our-address">
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
        }))
        this.validate()
    },
    backCart() {
        document.querySelector('.backCart').addEventListener('click', (e) => {
            document.querySelector('.order').remove()
            document.querySelector('.invisible').remove()
            cartInit()
        })
    },
    validate() {
        document.getElementById('submit').addEventListener('click', (e) => {
            e.preventDefault()
            if (e.target === document.getElementById('submit')) {
                e.preventDefault()
                let regexp_phone = /^((8|\+7)[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{11,17}$/
                let inputs = document.querySelector('.aboutRecipient').getElementsByTagName('input')
                let chooseDelivery = document.querySelector('.chooseDelivery').getElementsByTagName('input')
                let payment = document.querySelector('.payment').getElementsByTagName('input')
                removeErrors()
                this.validRadio('.chooseDelivery', chooseDelivery)
                this.validRadio('.payment', payment)
                let notValid = false
                for (let i = 0; i < inputs.length; i++) {
                    if (inputs[i].value === '') {
                        e.preventDefault()
                        inputs[i].classList.add('notValid')
                        errorMessage(inputs[i], 'Обязательное поле для заполнения')
                        notValid = true
                    } else if (inputs[i].value !== '') {
                        inputs[i].classList.remove('error')
                        inputs[i].classList.remove('notValid')
                        if (!regexp_phone.test(inputs[i].value) && inputs[i].id === 'phone') {
                            inputs[i].classList.add('notValid')
                            errorMessage(inputs[i], 'Введите номер в формате 7-000-000-00-00')
                        } else if (regexp_phone.test(inputs[i].value) && inputs[i].id === 'phone') {
                            inputs[i].classList.remove('error')
                            inputs[i].classList.remove('notValid')
                        }
                    }
                }
            }
        })
    },
    validRadio(name, el){
        document.querySelector(name).addEventListener('click', (e) => {
            if (e.target === el[0] || el[1]){
                if (document.querySelector(name).querySelector('.error')) {
                    document.querySelector(name).querySelector('.error').remove()
                }
                return e.target.checked = true
            }
        })
        if (!(el[0].checked || el[1].checked)) {
            document.querySelector(name).insertAdjacentHTML('beforeend',
                `<div class="error">
                                           <p>Выберите один из пунктов</p>
                                       </div>`)
        }
    }
}

function errorMessage(where, text) {
    where.insertAdjacentHTML('afterend', `
        <div class="error">
        <p>${text}</p>
        </div>`)
}

function removeErrors() {
    Array.from(document.querySelectorAll('.error')).forEach(item => {
        item.remove()
    })
}

