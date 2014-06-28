
    var sendRequest = function (teams) {
        console.log("gu: Sending request for ", teams);
        var req = new XMLHttpRequest();
        req.open("GET", "https://twitter.com/search?q="+teams+"vine.co%20goal", true);
        req.onreadystatechange = function() {
            if (req.readyState == 4) {
                if (req.status == 200) {
                    
                    console.log('gu: got response');
                    [].slice.call(document.querySelectorAll('.dropdown--key-events .dropdown__content')).forEach(function (el) {
                        
                        var foo = document.createElement('div')
                        foo.innerHTML = req.responseText;

                        var html = [].slice.call(foo.querySelectorAll('.tweet-text')).map(function (tweet) {
                            var tweetx = document.createElement('div');
                            tweetx.innerHTML = tweet.innerHTML;
                            return '<p class="tweetx">' + tweetx.innerHTML + '</p>';
                        }).join('');

                        el.innerHTML = html
                        
                    })

                }
            }
            };
        req.send();
    }; 
                
(function() { 

    window.addEventListener('load', function () {
    
        console.log('gu: Guardian Goals')
        
        window.setInterval(function () {
            var teams = document.querySelectorAll('.team__name');
            var scores = document.querySelectorAll('.team__score');
            console.log('gu:', teams, scores);

            sendRequest(teams[0].textContent + '%20' + teams[1].textContent);

        }, 20000);

        var css = document.createElement('style');
        css.textContent  = '.twitter-hashflag { display: none; }'
        css.textContent += '.tweetx { background-color: white; padding: 5px; box-sizing: border-box; margin: 10px 0; border-bottom: 1px solid #999; display: block; font-family: "AgateSans",sans-serif; font-size: 12px;}'
        document.body.appendChild(css);

    })

}).call(this);
