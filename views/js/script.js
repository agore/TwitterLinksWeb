$(document).ready(function() { 
    init()
});

init = function() {
    $("a").click(function() {
        var $this = $(this);
        markAsRead($this.data("tweet-id"), $this);
    });
    $("div.tweet").click(function() {
       console.log("tweet clicked");
    });
    markAsRead = function(tweetId, elem) {
        $.ajax({
            _url: "https://fierce-river-4730.herokuapp.com/tweets/read",
            url: "http://gci-agore-m.us.ad.gannett.com:5000/tweets/read",
            data: JSON.stringify({
                "id": tweetId
            }),
            contentType: 'application/json; charset=utf-8',
            type: "POST"
        }).success(function(data, textStatus, jqXhr) {
            elem.addClass("read");
        }).error(function(jqXhr, status, error) {
            console.log("error is " + error);
        });
    }
}


