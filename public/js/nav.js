const gifLinks = [
    [//prompt
        {
            imageUrl: 'https://media.giphy.com/media/3ohc1cBc5pZXSgv8GI/giphy.gif',
            imageAlt: 'kitten hanging from sheets'
        }
    ],
    [//stay
        {
            imageUrl: 'https://media.giphy.com/media/l3dj09hpsfuYkijDi/giphy.gif',
            imageAlt: 'TIM MEADOWS MR GLASCOTT GIF BY THE GOLDBERGS'
        },
        {
            imageUrl: 'https://media.giphy.com/media/l0MYwmulKyC1hhJ1C/giphy.gif',
            imageAlt: 'scrubs get pumped'
        },
        {
            imageUrl: 'https://media.giphy.com/media/QfHxsplYCvmwqh0vo0/giphy.gif',
            imageAlt: 'happy d&d'
        }
        
    ],
    [//leave
        {
            imageUrl: 'https://media.giphy.com/media/UQaRUOLveyjNC/giphy.gif',
            imageAlt: 'sad child waving goodbye'
        }
    ]
]

function getGifLink(roundNum) {
    var gifObjectArr = gifLinks[roundNum];
    var randomOptionNum = Math.floor(Math.random() * (gifObjectArr.length))
    var objectTemp = gifObjectArr[randomOptionNum]
    switch(roundNum){
        case 0:
            objectTemp.title = 'Leaving so soon?';
            objectTemp.showCancelButton = true;
            objectTemp.text = "...but the story was just getting good";
            objectTemp.confirmButtonText = "It's kinda boring";
            objectTemp.cancelButtonText = "I'll stick it out";
            objectTemp.buttonsStyling = false;
            objectTemp.reverseButtons = true;
            break;
        case 2:
            objectTemp.title = 'Thanks for stopping by';
            objectTemp.footer = 
                '<div class="d-flex flex-column text-center">'+
                    '<h5>Have ideas on how we could improve the site better?</h5>'+
                    '<a href="#">Please let us know</a>' +
                '</div>';
            objectTemp.onClose = () => {
                window.location = '/logout';
            }
            break;
        case 3:
            title = 'Log Out?';
            type = 'warning';
            showCancelButton = true;
            confirmButtonColor = '#3085d6';
            cancelButtonColor = '#d33';
            confirmButtonText = 'Yes, delete it!';
        break;
    }
    return objectTemp
}

const leaveOptions = swal.mixin({
    confirmButtonClass: 'btn btn-danger mx-2',
    cancelButtonClass: 'btn btn-success mx-2',
    imageWidth: 400
})

function logOut(){
    swal(getGifLink(3)).then((result) => {
        if (result.value) swal(getGifLink(2))
      })
}


function leaveGame() {
    leaveOptions(getGifLink(0)).then((result) => {
        if (result.value) {
            $.get('/logout',function(data, status) {
                console.log(status)
                if(status === 'success') {
                    leaveOptions(getGifLink(2)) 
                } 
            })
        } else if (result.dismiss === swal.DismissReason.cancel) {
            leaveOptions(getGifLink(1))
        }
    })
  }

var listenSignIn = () => {
    $(".register").on('click',function(){
        swal.close()
        swalFromPageContents("signup");
    });
    $("#recover-pw").on('click',function(){
        swal.close()
    });
}

var loadPageAsSwal = function(page, listenerCallback){
    $.get('/'+ page,function(data, status) {
        if(status === 'success') {
            var tempDiv = $('<div>').html(data.substring(data.indexOf('</head>')+7,data.length))
            $("nav",tempDiv).remove();
            console.log(tempDiv)
            swal({
                html: tempDiv.html(),
                showConfirmButton: false,
                onOpen: listenerCallback
            })
        }
    });
}; 

function sideBarCollapse(){
    $('#overlay').removeClass('active');
    $('.sideBar').removeClass('active');
    setTimeout(function(){$('#topnav').addClass('sticky-top')},200)
}
function sideBarExpand(){
    $('.sideBar').addClass('active');
    $('#overlay')
        .addClass('active')
        .on('click',sideBarCollapse);
    $('#topnav').removeClass('sticky-top');
    $('.collapse.in').toggleClass('in');
    $('a[aria-expanded=true]').attr('aria-expanded', 'false');
}

$(document).ready(function (e) {
    $('body').append($('<div>').attr('id','overlay'))
    $(".sideBar").mCustomScrollbar({
        theme: "minimal"
    });
    $('#dismiss').on('click', sideBarCollapse);
    $('#showSideBar').on('click', sideBarExpand);
    $(".signin").on('click',function(){
        loadPageAsSwal('signin',listenSignIn);
    });
    $(".log-out").on('click',logOut);
    $(".exit-game").on('click',leaveGame);
})