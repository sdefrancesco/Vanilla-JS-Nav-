var modalSetting = {
    open: false
}

function openModal(reverse) {
    //get modal
    var modal = document.querySelector('.modal-container')
    var modalIn = anime.timeline({
        autoplay: false,
        begin: function() {
            modalSetting.open = true
            stopScroll()
        },
        complete: function(anime) {
            if(anime.reversed) {
                console.log('reverse complete')
                modal.style.display = 'none'
                stopScroll(true)
            }
        }
    }).add({
        targets: '.modal-container',
        opacity: [0,1],
        easing: 'easeInOutQuint',
        duration: 450,
        begin: function() {
            modal.style.display = 'flex'
        }
    }).add({
        targets: modal.children,
        scale: [.8,1],
        opacity: [0, 1],
        easing: 'easeOutQuint',
        duration: 300,
        offset: '-=100'
    }).add({
        targets: '.modal h1, h3',
        translateX: [50, 0],
        opacity: [0, 1],
        easing: 'easeInOutQuint',
        duration: function(el, i, l) {
            return 350 * i
        },
        offset: '-=200'
    }).add({
        targets: document.querySelector('.modal form'),
        opacity: [0, 1],
        easing: 'easeInOutQuint',
        translateY: [50, 0],
        duration: 400,
        offset: '-=200'
    })

    if(reverse) {
        modalIn.reverse()
        return modalIn.play()
    }
    modalIn.play()

}

function stopScroll(param) {
    if(param) {
        return document.body.style.overflowY = 'scroll'
    }
    document.body.style.overflowY = 'hidden'
}
