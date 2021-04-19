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
            prodCard.styleCard()
            document.getElementById('photo').style.filter = 'none'
            this.closeGallery()
            this.openImg(item)
        }))
    },
    closeGallery() {
        let closeBlock =  document.querySelector('.invisible')
        closeBlock.addEventListener('click', (e) => {
            console.log(e.target);

            console.log(document.getElementById('photo').style.backgroundSize);
            if (e.target !== document.getElementById('photo')) {
               prodCard.delStyle()
            }
        })
    },

    openImg(item){
        let src = item.querySelector('.photo').getAttribute('alt')
        switch (src) {
            case 'project1' : if (src === 'project1')
                console.log(gallery[0].project1)
                document.getElementById('photo').style.backgroundImage = `url('${gallery[0].project1}')`
                break
            case 'project2' : if (src === 'project2')
                console.log(gallery[0].project2)
                document.getElementById('photo').style.backgroundImage = `url('${gallery[0].project2}')`
                break
            case 'project3' : if (src === 'project3')
                console.log(gallery[0].project3)
                document.getElementById('photo').style.backgroundImage = `url('${gallery[0].project3}')`
                break
            case 'project4' : if (src === 'project4')
                console.log(gallery[0].project4)
                document.getElementById('photo').style.backgroundImage = `url('${gallery[0].project4}')`
                break
        }
    }
}
slider.init()