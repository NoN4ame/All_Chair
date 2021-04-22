const feedBack = {
    init() {
        this.template()
    },
    // Метод для вызова шаблона
    template() {
        let btnSubscribe = document.getElementById('subscribe-btn');
        btnSubscribe.addEventListener('click', (e) => {
            if (e.target === btnSubscribe) {
                document.querySelector('.main').insertAdjacentHTML('afterbegin',
                    `<div class="invisible subscribe-block">
                            <div class="subscribe-card">
                                <img src="../img/other/subscribe.png" alt="">
                                 <img class="close" src="../img/other/close.svg" alt="close">
                                <p class="subscribe-card__text">ПОДПИСКА НА КАТАЛОГ</p>
                                <p class="subscribe-card__text">Введите контактные данные для получения<br>
                                обновленного каталога продукции каждый месяц</p>
                                <form action="#">
                                    <input id="email" type="email" placeholder="E-mail">
                                    <button id="subscribe-submit" class="btn" type="submit">ПОДПИСАТЬСЯ</button>
                                </form>
                            </div>
                          </div>`)
            }
            // Вызываем стили для заднего фона
            prodCard.styleCard()
            this.closeCard()
            document.getElementById('subscribe-submit').addEventListener('click', this.validation)
        })
    },
    // Событие закрытия карточки товара
    closeCard() {
        let card = document.querySelector('.invisible');
        // Вешаем на него обработчик событий
        card.addEventListener('click', (e) => {
            // Если клик был по блоку или на иконку 'X', то закрываем карточку товара
            if (e.target === document.querySelector('.close')
                || e.target === document.querySelector('.invisible')) {
                prodCard.delStyle()
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
    },
    validation(event) {
        let regexp_email = /^.+@.+\..+$/im;
        let email = document.getElementById('email').value
        event.preventDefault()
        // Проверяем введенные данные в поле email
        if (!regexp_email.test(email)) {
            event.preventDefault()
            removeErrors()
            errorMessage(document.getElementById('subscribe-submit'), 'Введите email')
            // Корректируем стиль ошибки
            document.getElementById('email').style.borderColor = 'red'
            document.querySelector('.error').style.marginTop = '10px'
            document.querySelector('.error').style.position = 'absolute'
            document.querySelector('.error').style.width = '243px'
            document.querySelector('.error').style.left = '75px'
        } else {
            // Если почта введена правильно, то закрываем карточку
            prodCard.delStyle()
        }
    }
}
feedBack.init()