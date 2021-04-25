const filter = {
    // Инициализация корзины
    init(){
        this.filter_category()
    },
    // Вешаем обработчик событий на каждый из эл-ов категории
    filter_category (){
       let filter_contain = document.querySelector('.filter')
        filter_contain.querySelectorAll('.all-products__category')
            .forEach(item => item.addEventListener('click', () => {
                this.choice_products(item)
            }))
    },
    choice_products(category) {
        // Категории
        let all = document.getElementById('all')
        let popular = document.getElementById('popular')
        let new_product = document.getElementById('new')
        let favorites = document.getElementById('favorites')
        // Проверяем на какой эл-т был клик и производим фильтрацию
        switch (category) {
            case all : if (event.target === all)
                // Сначала удаляем все классы 'active'
                this.toggle_products()
                // Затем добавляем 'active' эл-т по которому был клик
                this.show_products(all)
                // Исходя из категории, показываем или скрываем товары
                this.visibility_products('.product')
                // Возвращаем надпись 'Популярные товары'
                document.querySelector('.hide').style.display = 'block'
                break
            case popular : if (event.target === popular)
                this.toggle_products()
                this.show_products(popular)
                this.visibility_products('.popular', '.product')
                break
            case new_product : if (event.target === new_product)
                this.toggle_products()
                this.show_products(new_product)
                this.visibility_products('.new', '.product')
                break
            case favorites : if (event.target === favorites)
                this.toggle_products()
                this.show_products(favorites)
                this.visibility_products('.our-choice', '.product')
                break
        }
    },
    // Добавляем выбранной категории класс 'active'
    show_products(category){
        category.classList.add('active')
    },
    // Удаляем классы 'active'
    toggle_products(){
        document.querySelectorAll('.all-products__category')
            .forEach(item => item.classList.remove('active'))
        document.querySelectorAll('.product')
            .forEach(item => item.classList.remove('active'))
    },
    // Скрываем не подходящие по категории товары, а подходящим добавляем класс 'active'
    visibility_products(show, hide) {
        document.querySelectorAll(show).forEach(el => el.classList.add('active'))
        document.querySelectorAll(hide).forEach(item => item.style.display = 'none')
        // Удаляем надпись 'Популярные товары'
        document.querySelector('.hide').style.display = 'none'
    }

}
filter.init()