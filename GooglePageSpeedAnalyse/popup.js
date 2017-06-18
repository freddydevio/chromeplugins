
var API_KEY = 'AIzaSyC2bWoSa4vZZvjZJlI8P9cqoW0Rrk3B7gY';
var API_URL = 'https://www.googleapis.com/pagespeedonline/v2/runPagespeed?';
var CHART_API_URL = 'http://chart.apis.google.com/chart?';

var URL_TO_GET_RESULTS_FOR = 'https://respond-with-humanity.de/';


chrome.tabs.getSelected(null,function(tab) {
    var tablink = tab.url;
    document.getElementById("pageUrl").textContent = tablink;
});

function run() {
    $(".toLoad").hide();
    $(".loader").show();
    $.ajax({
        url: API_URL + 'url=' + document.getElementById("pageUrl").textContent + '&strategy=mobile&key=' + API_KEY,
        type: 'GET',
        success: function(data) {
            document.getElementById("pageTitle").textContent = data["title"];
            document.getElementById("mobilePageSpeed").textContent = "Speed: " + data.ruleGroups.SPEED.score;
            document.getElementById("mobilePageUsability").textContent = "Usability: " + data.ruleGroups.USABILITY.score;
        }
    });   
    $.ajax({
        url: API_URL + 'url=' + document.getElementById("pageUrl").textContent + '&strategy=desktop&key=' + API_KEY,
        type: 'GET',
        success: function(data) {
            document.getElementById( "desktopPageSpeed" ).textContent = "Speed: " + data.ruleGroups.SPEED.score;
            $(".loader").hide();
            $(".toLoad").show();
        }
    }); 
}

document.getElementById("do-run").addEventListener("click", run);