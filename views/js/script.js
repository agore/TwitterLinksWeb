$(document).ready(function() { 
    init()
});

init = function() {
    $("div.tweet").click(function() {
       console.log("tweet clicked");
    });

    $("a.loadMore").click(function() {
        console.log("fetchMore");
        var id = $("div.tweet:last").data("tweet-id");
        fetchMore(id);
    });

    markAsRead = function(tweetId, elem) {
        $.ajax({
            url: "https://fierce-river-4730.herokuapp.com/tweets/read",
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

    fetchMore = function(olderThanId) {
        var requesId = olderThanId + 1;
        console.log("Now fetching older than " + requesId);
        
        $.get({
            _url: "https://fierce-river-4730.herokuapp.com/tweets/all?count=50&older_than_id=" + olderThanId,
            url: "/more?count=50&older_than_id=" + requesId
        }).success(function(data, textStatus, jqXhr) {
            
            var jsonResponse = JSON.parse(data);
            for (var i = 0; i < jsonResponse.length; i++) {
                var t = jsonResponse[i];
                $t = $("<div class='tweet' data-tweet-id='" + t.id + "'>" +
                        "    <img class='avatar' alt='" + t.name + "' src='" + t.au + "' />" +
                        "    <div class='byline'><span class='name'>" + t.name + "</span><span class='handle'>@ " + t.sn + "</span></div>"+
                        "    <div class='timestamp'>" + t.ts + "</div>" +
                        "    <div class='text'>" + t.t + "</div>" +
                        "    <ul class='links'><li class='link'><a href='" + t.urls[0]+ "' target='_new' data-tweet-id='" + t.id+ "'>" + t.urls[0]+ "</a></li></ul>" +
                       "</div>");
                $("div.tweet:last").after($t);
            }
            
        }).error(function(jqXhr, status, error) {
            console.log("error is " + error);
        });
        
    }
}


