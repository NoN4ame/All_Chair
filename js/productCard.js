/*
1 метод
* По клику узнаем на какой товар был клик
* Узнаем путь до картинки
* Название и цену
2 метод
* Отрисовываем шаблон карточки товара
* Подставляем туда актуальные эл-ты
*
*/

const prodCard = {
    pro: [],
    init(){
        this.productInfo()

    },
    productInfo(){
        // Находим обертку товара
        let goods = document.querySelectorAll('.product');
        // Вешаем обработчики события на каждый товар
        for (let i = 0; i < goods.length; i++){
            goods[i].addEventListener('click', (event) => {
                // Получаем полную карточку товара при клике
                let productContainer = event.target.parentNode
                console.log(productContainer);
                // Находим в родителе нужные параметры цены и название
                let name = productContainer.querySelectorAll('.product__name')
                let price = productContainer.querySelectorAll('.product__price')
                console.log(name[0])
                console.log(price[0])
                // Получаем значение внутри карточки товара
                //let productVal = productContainer.children
                //// Перебираем
                //for ( let elem of productVal) {
                //    console.log(elem.innerHTML)
                //    for (let g = 0; g < elem.length; g++) {
                //        console.log(g);
                //    }
                //}
                //console.log(this.pro)
                //for (let g = 0; 0 < this.pro.length; g++){
                //    console.log(g)
                //}
            })
        }
    },

}

prodCard.init()