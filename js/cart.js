const cart = [];
// Вешаем обработчик на элемент "Корзина"
document.getElementById('cart').addEventListener('click', () => {
    // При клике создаем шаблон для корзины
    document.querySelector('main').insertAdjacentHTML('beforeend',
        `<div class="invisible">
                    <div class="cart">
                  </div>
            </div>`)
    // Проверяем, если корзина пуста, то выводим пустой шаблон
    if (cart.length === 0) {
        document.querySelector('.cart').insertAdjacentHTML('beforeend',
            `<h1>КОРЗИНА</h1>
                    <img class="close" src="../img/other/close.svg" alt="close">
                    <hr>
                    <p>Корзина Пуста</p>
                    <a href="../templates/catalog.html">
                        <button>В каталог</button>
                    </a>
                `)
        // Вызов стилей для заднего фона
        this.styleCard()
        // Вызов событий для закрывания окна корзины
        this.triggers()
        // Если корзина не пуста, то выводим товары в корзине
    } else cartItems()
})
let cartItems = (img, name, vendorCode, price) => {
    document.querySelector('.cart').insertAdjacentHTML('beforeend',
        `<div>123</div>`)
}
function styleCard() {
    document.querySelector('body').style.backgroundColor = 'rgba(0, 0, 0, 0.5)'
    document.querySelector('header').style.filter = 'brightness(0.5)'
    document.querySelectorAll('.container')
        .forEach(div => div.style.filter = 'brightness(0.5)')
    document.querySelectorAll('.container')[0].style.filter = 'none'
}
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
