const gallery = []
const slider = {
    init(){
        this.render()
    },
    render(){
        let container = document.querySelector('.our-projects__content')
        let photo = container.querySelectorAll('.photo_container')
        photo.forEach(item => item.addEventListener('click', (e) => {
            this.backgroundStyle()
            let src = item.querySelector('.photo').getAttribute('src')
            document.querySelector('main').insertAdjacentHTML('beforeend', 
                `<div class="invisible">
                        <div class="big_photo">
                        <img src="${src}" alt="">
</div>
                </div>`)
        }))
    },
    backgroundStyle() {
    document.querySelector('body').style.backgroundColor = 'rgba(0, 0, 0, 0.5)'
    document.querySelector('header').style.filter = 'brightness(0.5)'
    document.querySelectorAll('.container')
        .forEach(div => div.style.filter = 'brightness(0.5)')
    document.querySelectorAll('.container')[0].style.filter = 'none'
},
}
slider.init()