const gallery = [
    {
        project1: "../img/our_projects/big/project_1.jpg",
        project2: "../img/our_projects/big/project_2.jpg",
        project3: "../img/our_projects/big/project_3.jpg",
        project4: "../img/our_projects/big/project_4.jpg",
    }
]
const slider = {
    init() {
        this.render()
    },
    render() {
        let container = document.querySelector('.our-projects__content')
        let photo = container.querySelectorAll('.photo_container')
        document.querySelectorAll('.photo').forEach(item => gallery.push(item))
        photo.forEach(item => item.addEventListener('click', () => {
            document.querySelector('main').insertAdjacentHTML('beforeend',
                `<div class="invisible">
                        <div class="big_photo">
                            <div id="photo" class="container"></div>
                        </div>
                </div>`)
            this.styleCard()
            this.closeGallery()
            this.openImg(item)
        }))
    },
    styleCard() {
        document.querySelector('body').style.backgroundColor = 'rgba(0, 0, 0, 0.5)'
        document.querySelector('header').style.filter = 'brightness(0.5)'
        document.querySelectorAll('.container')
            .forEach(div => div.style.filter = 'brightness(0.5)')
        document.querySelectorAll('.container')[0].style.filter = 'none'
        document.getElementById('photo').style.filter = 'none'
    },
    closeGallery() {
        let closeBlock =  document.querySelector('.invisible')
        closeBlock.addEventListener('click', (e) => {
            console.log(e.target);

            console.log(document.getElementById('photo').style.backgroundSize);
            if (e.target !== document.getElementById('photo')) {
               this.delStyle()
            }
        })
    },
    delStyle () {
        document.querySelector('.invisible').remove()
        document.body.style.backgroundColor = 'transparent'
        document.body.style.overflow = 'auto'
        document.querySelector('header').style.filter = 'none'
        document.querySelectorAll('.container')
            .forEach(div => div.style.filter = 'none')
    },
    openImg(item){
        let src = item.querySelector('.photo').getAttribute('alt')
        switch (src) {
            case 'project1' : if (src === 'project1')
                console.log(gallery[0].project1)
                document.getElementById('photo').style.backgroundImage = `url('${gallery[0].project1}')`
                this.getImgSize(`${gallery[0].project1}`)
                break
            case 'project2' : if (src === 'project2')
                console.log(gallery[0].project2)
                document.getElementById('photo').style.backgroundImage = `url('${gallery[0].project2}')`
                this.getImgSize(`${gallery[0].project2}`)
                break
            case 'project3' : if (src === 'project3')
                console.log(gallery[0].project3)
                document.getElementById('photo').style.backgroundImage = `url('${gallery[0].project3}')`
                this.getImgSize(`${gallery[0].project3}`)
                break
            case 'project4' : if (src === 'project4')
                console.log(gallery[0].project4)
                document.getElementById('photo').style.backgroundImage = `url('${gallery[0].project4}')`
                this.getImgSize(`${gallery[0].project4}`)
                break
        }
    },
    // Получаем размер изображения
    getImgSize(url) {
        let img = new Image()
        img.onload = function () {
            document.getElementById('photo').style.width = `${this.width}px`
            if (`${this.height}px` === `476px`) {
                document.getElementById('photo').style.height = `${this.height}px`
                document.querySelector('.big_photo').style.top = '25%'
            }
            console.log(this.width)
        }
        img.src = url
    }
}
slider.init()