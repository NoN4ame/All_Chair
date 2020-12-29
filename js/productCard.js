const prodCard = {
    // Инициализация карточки товара
    init() {
        this.productInfo()

    },
    // Все о товаре
    productInfo() {
        // Находим обертку товара
        let goods = document.querySelectorAll('.product');
        // Вешаем обработчики события на каждый товар
        for (let i = 0; i < goods.length; i++) {
            goods[i].addEventListener('click', (event) => {
                // Получаем полную карточку товара при клике
                let productContainer = event.target.parentNode
                // Находим в родителе:
                // Картинка
                let img = productContainer.getElementsByTagName('img'),
                    // Путь до картинки
                    imgSrc = img[0].getAttribute('src')
                // Имя продукта
                let name = productContainer.querySelectorAll('.product__name');
                // Цена продукта
                let price = productContainer.querySelectorAll('.product__price');
                // Вызываем метод отрисовки карточки товара
                this.renderCard(imgSrc, name[0].textContent, price[0].textContent)
                this.triggers()
            })
        }
    },
    // Метод отрисовки карточки товара
    renderCard(imgSrc, name, price) {
        // Ищем контейнер в который передастся карточка товара
        let cardContainer = document.querySelector('main')
        // Прописываем HTML шаблон
        cardContainer.insertAdjacentHTML('afterbegin',
            `  <div class="invisible">
                        <div class="card">
                        <img src="${imgSrc}" alt="">
                        <img class="close" src="../img/other/close.svg" alt="close">
                        <div class="card__info">
                            <p class="card__name">${name}</p>
                            <p class="card__vendorCode">Артикль: ${Math.floor(Math.random() * 10000)}</p>
                            <p class="card__price">${price}</p>
                            <button class="btn">В корзину</button>
                            <p class="card__aboutGoods">The Series 7™ chair is an icon in modern<br>
                               furniture history, designed by Arne Jacobsen<br>
                               in 1955. Its unique shape is timeless and<br>
                               incredibly versatile, displaying character<br>
                               without overpowering the eye. The chair is<br>
                               made from 9 layers of pressure moulded<br>
                               veneer for strength, flexibility and durability<br>
                               despite its slender form. This is the most<br>
                               popular design within Fritz Hansen's chair<br>
                               collection.</p>
                        </div>
                        </div>
                       </div>`)
        // Вызов стилей при открытой карточке товара
        this.styleCard()
    },
    // Стили заднего фона при открытой карточке
    styleCard() {
        document.querySelector('body').style.backgroundColor = 'rgba(0, 0, 0, 0.5)'
        document.querySelector('header').style.filter = 'brightness(0.5)'
        document.querySelectorAll('.container')
                .forEach(div => div.style.filter = 'brightness(0.5)')
        document.querySelectorAll('.container')[0].style.filter = 'none'
    },
    // Событие закрытия карточки товара
    triggers() {
        // Получаем блок обертку
        let card = document.querySelector('.invisible');
        // Вешаем на него обработчик событий
        card.addEventListener('click', (e) => {
            // Если клик был по блоку или на иконку 'X', то закрываем карточку товара
            if (e.target === document.querySelector('.close')
                || e.target === document.querySelector('.invisible')) {
                document.querySelector('.card').remove()
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
    }
}
prodCard.init()