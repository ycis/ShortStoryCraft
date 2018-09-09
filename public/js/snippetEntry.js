const snippetTimeLimit = 30000;
var updateSnippetCharactersRemaining = function(textRemDiv,curLetterNum){
    if(typeof textRemDiv !== 'undefined') {
        textRemDiv.text(250-curLetterNum);
    } else {
        $('#segment-char-rem').text(250-$('#snippet-text').val().length);
    }
}
var updateSnippetSubmissionCountdown = function(secondsRemainingInRound){
    var snippetSecondCounterTextSpan = $('#countdown-sec')
    snippetSecondCounterTextSpan.text(secondsRemainingInRound);
    if ($('#submit-snippet').hasClass('disabled')) {
        if ($('#coundown-div').attr('style')!=='display:none;'){
            $('#coundown-div').hide();
        } else {
            return;
        }
    } else {
        if(!$('#coundown-div').hasClass('tada')) {
            if(secondsRemainingInRound > 10) return;
            $('#countdown').toggleClass('bg-danger border border-white rounded')
            $('#coundown-div').toggleClass('animated tada infinite countdown-alert');
        }
        if(secondsRemainingInRound <= 1) {
            $('#countdown-text').text('');
            snippetSecondCounterTextSpan.text('Times Almost Up!');
        }
    }
};


var setProgressBar = function (secondsRemainingInRound,progPercent){
    var progDiv = $(".round-progress");
    progDiv.attr('aria-valuenow',progPercent).width(`${progPercent}%`).text(secondsRemainingInRound + ' sec')
    if (secondsRemainingInRound > 10) return;

    var hasWarning = progDiv.hasClass('bg-warning');
    var hasDanger = progDiv.hasClass('bg-danger');

    if(secondsRemainingInRound > 5) {
       if(hasWarning) return;
       progDiv.addClass('bg-warning')
       return;
    }
    if(secondsRemainingInRound > 1) {
        if(hasDanger) return;
        if(hasWarning) $(".round-progress").removeClass('bg-warning').addClass('bg-danger')
        return;
    }
    progDiv.text('< ' + secondsRemainingInRound + ' sec');    
};

var updateTimeRemaining = function (millisecRemaining, previousSecondsRemainingInRound){
    var secondsRemainingInRound = Math.round(millisecRemaining * 0.001)
    var progPercent = Math.round((millisecRemaining/snippetTimeLimit) * 100);

    if(typeof secondsRemainingInRound !== 'number') {
        if (previousSecondsRemainingInRound === 0) return;
        secondsRemainingInRound = previousSecondsRemainingInRound;
    }
    if(previousSecondsRemainingInRound !== secondsRemainingInRound) {
        updateSnippetSubmissionCountdown(
            secondsRemainingInRound,
            $('#submit-snippet').hasClass('disabled'),
            $('#coundown-div').hasClass('tada')
        )
        setProgressBar(secondsRemainingInRound,progPercent);
    }
    previousSecondsRemainingInRound = secondsRemainingInRound;
};

$(document).ready(function (e) {
    $('#snippet-text').on('change keyup paste',function(){
        updateSnippetCharactersRemaining();
    })
})