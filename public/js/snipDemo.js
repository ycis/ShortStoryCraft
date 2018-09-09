const flipTime = 300;
const maxRunCnt = 2;

let kiText = 'When  found the butler with a knife to the chest the wound and called for help'
let delayAmt = 130;
let runCnt = 0;
let ltrNum = 0;
var timer;

var flipIt = function (card){
    if(!card.hasClass('is-flipped')) card.addClass('is-flipped')
}


let pctDemoTimer;
let milliLeft = 30000
let previousSecondsRemainingInRound;
var demoTimer = function(){
    if($('#countdown').attr('style') === 'display:none;') $('#countdown').show();
    var textbox = $('#snippet-text-demo');
    if (typeof textbox !== 'undefined' && runCnt <= maxRunCnt) {
        updateTimeRemaining(milliLeft)
        if (milliLeft < 0) {
            milliLeft = 30000;
            $('#countdown-text').text(' seconds left');
            $('#countdown').removeClass('bg-danger border border-white rounded')
            $('#coundown-div').removeClass('animated tada infinite countdown-alert');
            $(".round-progress").removeClass('bg-warning').removeClass('bg-danger')
        }
        milliLeft -= 1000;
        pctDemoTimer = setTimeout(demoTimer,1000)
    } else {
        $(".round-progress").remove();
        $('#countdown').remove();
        clearTimeout(pctDemoTimer);
        return;
    }
}

var fillCharacter = function() {
    var textRemDiv = $('#segment-text-rem-demo');
    var textbox = $('#snippet-text-demo');
    if(runCnt > maxRunCnt) return;
    if (typeof textbox !== 'undefined') {
        var res = kiText.substring(0, ltrNum);
        textbox.val(res);
        if (ltrNum < kiText.length) {
            delayAmt = 130
            ltrNum++;
        } else {
            ltrNum = 0; runCnt++; delayAmt = 1000;
        }
        updateSnippetCharactersRemaining(textRemDiv,ltrNum);
        timer = setTimeout(fillCharacter,delayAmt);
    } else {
        clearTimeout(timer);
    }
};


function launchSnippetDemo(){
    $('#game-holder').addClass('animated lightSpeedIn')
    setTimeout(function(){$('#sc-Character').addClass('is-flipped')},flipTime);
    setTimeout(function(){$('#sc-Verb').addClass('is-flipped')},flipTime*2);
    setTimeout(function(){$('#sc-Adjective').addClass('is-flipped')},flipTime*3);
    setTimeout(function(){
        fillCharacter();
        demoTimer();
        $('#game-holder').removeClass('animated lightSpeedIn')
    },2000)
}


$(document).ready(function (e) {
    console.log('errors',$('#login-errors').text());
    switch(true) {
    case $('#login-errors').text() !== '':
        $('#login-modal')
            .removeClass('fade')
            .modal();
        break;
    case $('.signup-errors').text() !== '':
    default:
        launchSnippetDemo();
        break;
    };
})