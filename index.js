var cheerio = require('cheerio');
var rp = require('request-promise');
var url = 'http://www.melon.com/chart/day/index.htm?idx=1&moved=Y';

function parse(limit = 50, callback) {
	var songs = [];

	if (limit > 100) {
		limit = 100;
	} else if (limit <= 0) {
		return callback(songs);
	}

	rp(url)
		.then(function (html) {
			var $ = cheerio.load(html);
			var songs = [];

		  $('#chartListObj tr').each(function(i, el) {
		  	if (i >= limit) return;

		  	var song_info_el = $(el).find('.wrap_song_info');

		    var trackName = $(song_info_el).find('.ellipsis.rank01 strong a').text();
		    var artistName = '';
		    $(song_info_el).find('.ellipsis.rank02 .checkEllipsis')
		    	.children()
		    	.each(function(i, ele) {
		    		if (i > 0)
		    			artistName += ', ';

		    		artistName += $(ele).text();
		    	});
		    var albumName = $(song_info_el).find('.ellipsis.rank03 a').text();

		    songs.push({
		      'rank': i+1,
		      'trackName': trackName,
		      'artistName': artistName,
		      'album': albumName
		    });
		  });

		  return callback(songs);
		})
		.catch(function (err) {
			return callback(null, err);
		});
}

module.exports.parse = parse;