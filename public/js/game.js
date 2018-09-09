$(document).ready(function (e) {

    $('#snippet-text').on('change keyup paste',function(){
        updateSnippetCharactersRemaining();
    })

});