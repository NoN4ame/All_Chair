const feedBack = {
    init() {
        this.template()
    },
    // Метод для вызова шаблона
    template() {
        let btnSubscribe = document.getElementById('subscribe-btn');
        btnSubscribe.addEventListener('click', (e) => {
            console.log(e.target);
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
                          </div>`)}
            // Вызываем стили для заднего фона
            this.styleCard()
            this.closeCard()
            document.getElementById('subscribe-submit').addEventListener('click', this.validation)
        })
    },
    // Стили заднего фона при открытой карточке товара
    styleCard() {
        document.querySelector('body').style.backgroundColor = 'rgba(0, 0, 0, 0.5)'
        document.querySelector('header').style.filter = 'brightness(0.5)'
        document.querySelectorAll('.container')
            .forEach(div => div.style.filter = 'brightness(0.5)')
        document.querySelectorAll('.container')[0].style.filter = 'none'
    },
    // Событие закрытия карточки товара
    closeCard(){
        let card = document.querySelector('.invisible');
        // Вешаем на него обработчик событий
        card.addEventListener('click', (e) => {
            // Если клик был по блоку или на иконку 'X', то закрываем карточку товара
            if (e.target === document.querySelector('.close')
                || e.target === document.querySelector('.invisible')) {
                document.querySelector('.subscribe-card').remove()
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
            if (e.target === document.querySelector('.close')){
                // Меняем ее на иконку розового цвета
                document.querySelector('.close').src='../img/other/close-pink.svg'
                // Если курсор не на иконке, то оставляем стандартную иконку
            } else document.querySelector('.close').src='../img/other/close.svg'
        })
    },
    validation(event) {
        let regexp_name = /^[a-zа-яё]+/gi,
            regexp_phone = /^((8|\+7)[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{7,10}$/,
            regexp_email = /^.+@.+\..+$/igm;
        let email = document.getElementById('email').value
        console.log(email)
            if (regexp_email.test(email) !== true) {
                console.log('не валидно')
                event.preventDefault()
            }
    }
}
feedBack.init()