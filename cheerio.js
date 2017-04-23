/**
 * Created by Administrator on 2017/4/22.
 */
var cheerio = require("cheerio");
var server = require("./curl");

var url = "https://movie.douban.com/cinema/nowplaying/shanghai/"

server.download(url, function(data) {
    if (data) {
        //console.log(data);

        var myarr=new Array();
        var $ = cheerio.load(data);
        $("#nowplaying .mod-bd .lists li ul").each(function(i, e) {
            myarr[i]={};
            myarr[i].title=$(e).children(".stitle").children("a").attr("title");
            myarr[i].score=$(e).children(".srating").children(".subject-rate").html();
            myarr[i].url=$(e).children(".poster").children("a").attr("href");

        });
        sort(myarr);
        for (var i=0;i<myarr.length;i++){
            console.log(myarr[i].title+" "+myarr[i].score+" "+myarr[i].url);
        }

        console.log("OK");
    } else {
        console.log("error");
    }
});

function sort(array) {
    var i = 0,
        len = array.length,
        j, d;
    for (; i < len; i++) {
        for (j = 0; j < len; j++) {
            if (array[i].score > array[j].score) {
                d = array[j];
                array[j] = array[i];
                array[i] = d;
            }
        }
    }
    return array;
}