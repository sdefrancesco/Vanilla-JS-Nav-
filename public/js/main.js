
window.onload = function() {
    preloaderOut()

}

function preloaderOut() {
    setTimeout(function() {
        document.querySelector('.preloader').style.display = 'none'
    }, 1000)

}

var dropdowns = {}

function handleHoverAnimation(target, dropdown, callback) {
    var timeline = anime.timeline({
        autoplay: true,
        begin: function() {
            dropdowns.open = true
        }
    })
    .add({
        targets: dropdown,
        // translateY: [50, 0],
        scaleY: [.1, 1],
        opacity: [0, 1],
        easing: 'easeInOutQuint',
        duration: 200,
        // translateX: [50, 0],
        begin: function() {
            dropdown.style.display = 'block'
            // console.log(target)
        },
        complete: function() {
            return callback()
        }
    }).add({
        targets: document.querySelector('.' + target.getAttribute('data-target') + ' h5'),
        opacity: [0,1],
        duration: 400,
        easing: 'easeInOutQuint',
        translateX: [50, 0],
    }).add({
        targets: document.querySelector('.' + target.getAttribute('data-target') + ' ul').children,
        opacity: [0, 1],
        easing: 'easeInOutQuint',
        color: {
            value: ['#fff', '#808080'],
            easing: 'easeInOutQuint',
            duration: 300,
        },
        duration: 200,
        offset: '-=320',
        delay: function(el,i,l) {
            return 200/2 * i
        },
        begin: function() {
            document.querySelector('.' + target.getAttribute('data-target')).style.display = 'block'
        },
        complete: function() {
            for(var i = 0; i< document.querySelector('.' + target.getAttribute('data-target') + ' ul').children.length; i++) {
                document.querySelector('.' + target.getAttribute('data-target') + ' ul').children[i].style.color = ''
            }
            return console.log('done')
        }
    })
}


function handleHover(target) {
    var nav = document.querySelector('.nav-container')
    var dropdown = document.querySelector('.dropdown')
    target.onmouseleave = function() {
        target.style.color = 'grey'
    }

    dropdown.onmouseleave = function() {
        dropdown.style.display = 'none'
        dropdowns.open = false
        target.style.color = ''
    }

    target.onmouseenter = function() {
        target.style.color = 'grey'
        dropdown.style.left = target.offsetLeft + 'px'
        dropdown.style.top = target.offsetTop + 40 + 'px'
        // dropdown.style.display = 'block'
        for(var i = 0; i < dropdown.children.length; i++) {
            // console.log(dropdown.children[i].className, target.getAttribute('data-target'))
            if(dropdown.children[i].className !== target.getAttribute('data-target')) {
                dropdown.children[i].style.display = 'none'
            } else {
                dropdown.children[i].style.display = 'block'
            }
        }
        // console.log('enter', target.offsetTop, document.querySelector('.dropdown').offsetTop, dropdown.offsetLeft)
        // dropdowns.open = true
        // var playy = anime({
        //     targets: '.dropdown',
        //     translateX: [0, ]
        // })

        dropdown.onmouseleave = function() {
            target.style.color = ''
            dropdowns.open = false
            dropdown.style.display = 'none'
        }
        if(dropdowns.open || dropdowns.open == 'undefined') {
            dropdown.onmouseleave = function() {
                dropdown.style.display = 'none'
                target.style.color = ''
                dropdowns.open = false
            }
        } else {
            handleHoverAnimation(target, dropdown, function() {
                console.log('callback finish anim')

            })
        }
    }

}


var targets = document.getElementsByClassName('dropdown-target')
for(var i = 0; i < targets.length; i++) {
    handleHover(targets[i])
}


// handle scroll for nav

window.onscroll = function() {
    var beginningWaypoint = new Waypoint({
        element: document.querySelector('body'),
        offset: 350,
        handler: function(direction) {
            console.log(direction)
            if(direction == 'down') {
                console.log('down')
                if(!document.querySelector('.nav-container').classList.contains('scrolled')) {
                    var navIn = anime({
                        targets: '.nav-container',
                        backgroundColor: 'rgba(0,0,0,.9)',
                        easing: 'easeInOutQuint',
                        duration: 400,
                        height: '80px',
                        begin: function() {
                            document.querySelector('.nav-container').classList.add('scrolled')
                        }
                    })
                }
            } else {

            }
        }
    })    
}

function animateHeaderOut(direction, element, animedirection) {
    var navHeaderOut = anime({
        autoplay: false,
        targets: element,
        scaleY: [1, 0],
        easing: 'easeOutQuint',
        translateY: [0, -50],
        duration: 700,
        begin: function(anime) {
            if(anime.reversed) {
                element.classList.remove('navGone')
                element.classList.remove('gone')
            }
            return element.classList.add('gone')

        },
        complete: function(anime) {
            if(!anime.reversed) {
                element.classList.add('navGone')
            } else {
                element.classList.remove('navGone')
            }
        }
    })

    if(!animedirection) {
        navHeaderOut.reverse()
        console.log('reversed!')
    }

    if(navHeaderOut.completed) {
       navHeaderOut.reset() 
       navHeaderOut.play()
    }
    navHeaderOut.play()
}


function checkPageLocation(param) {
    var nav = document.querySelector('nav')
    for(var i=0; i< nav.children.length; i++) {
        if(param.getAttribute('scroll-target') !== nav.children[i].innerHTML && !nav.children[i].classList.contains('btn')) {
            nav.children[i].style.color = 'grey'
            nav.children[i].style.opacity = .4
        } else {
            nav.children[i].style.opacity = 1
            nav.children[i].style.color = ''
            nav.children[i].classList.add('text-primary')
        }
    }
}

function scrollTo(element) {
    console.log('scrolling to..', element)
    var jumpTo = anime({
        targets: "html, body",
        scrollTop: [window.pageYOffset, "+=" + document.querySelector('#' + element).getBoundingClientRect().top],
        duration: 800,
        easing: 'easeOutExpo'
    })
}

// document.querySelector('#about-target').addEventListener('click', function(e) {
//     e.preventDefault()
//     scrollTo()
// })

for(var i=0; i < document.querySelector('nav').children.length ; i++) {
    if(!document.querySelector('nav').children[i].classList.contains('btn')) {
        document.querySelector('nav').children[i].addEventListener('click', function(e) {
            e.preventDefault()
            scrollTo(e.target.innerHTML)
            checkPageLocation(document.querySelector('#'+ e.target.innerHTML))
        })
    }
}

var aboutWaypoint = new Waypoint({
    element: document.querySelector('#About'),
    handler: function() {
        let aboutAnimation = anime.timeline({
            autoplay: false
        }).add({
            targets: document.querySelector('#About h1'),
            easing: 'easeInOutQuint',
            opacity: [0, 1],
            scale: [1.5, 1],
            duration: 400
        }).add({
            targets: document.querySelector('#About h5'),
            opacity: [0, 1],
            duration: 400,
            translateY: [20, 0],
            easing: 'easeInOutQuint'
        })
        aboutAnimation.play()
    }
})

