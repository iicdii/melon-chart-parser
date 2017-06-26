var cheerio = require('cheerio');
var rp = require('request-promise');

var opts = {
	limit: 50,
	type: 'daily',
	genre: 'KPOP',
	year: new Date().getFullYear(),
	month: new Date().getMonth()+1
};

/*
	when type is 'genre' you can send genre by genre parameter below value.

	'DP0100' (가요),
	'DP0200' (POP),
	'DP0300' (OST),
	'DP0400' (J-POP),
	'DP0500' (클래식),
	'DP0600' (CCM),
	'DP0700' (어린이),
	'DP0800' (뉴에이지),
	'DP0900' (재즈),
	'DP1000' (월드뮤직),
	'DP1100' (종교음악),
	'DP1200' (국악),
	'DP1300' (중국음악),
	'DP1400' (일렉트로니카/클럽뮤직),
	'DP1500' (락/메탈),
	'DP1600' (R&B/SOUL),
	'DP1700' (랩/힙합),
	'DP1800' (인디음악),
	'DP1900' (트로트),
	'DP2000' (태교)

	or if type is 'year' you can send genre by genre parameter below value.

	'KPOP' (KPOP),
	'POP' (POP)
 */

function parse(opts = opts, callback) {
	var songs = [];

	if (!opts.limit) {
		opts.limit = 50;
	} else if (opts.limit > 100) {
		opts.limit = 100;
	} else if (opts.limit <= 0) {
		return callback(songs);
	}

	var url = 'http://www.melon.com/chart/day/index.htm?idx=1&moved=Y';

	switch(opts.type) {
		case 'daily':
			break;
		case 'week':
			url = 'http://www.melon.com/chart/week/index.htm';
			break;
		case 'month':
			if (!opts.month || !opts.year) break;
			var month = ("0" + (opts.month)).slice(-2);

			url = 'http://www.melon.com/chart/month/index.htm#params[idx]=1&params[rankMonth]=' + opts.year + opts.month;
			break;
		case 'year':
			var year = opts.year;
			var genre = opts.genre;
			if (!year || !genre) break;
			if (year === new Date().getFullYear()) year--;

			url = 'http://www.melon.com/chart/age/list.htm?moved=Y&chartType=YE&chartGenre=' + genre + '&chartDate=' + year;
			break;
		case 'genre':
			var genre = opts.genre;
			if (!genre) break;

			url = 'http://www.melon.com/chart/genre/index.htm?classCd=' + opts.genre;
			break;
		default:
			break;
	}

	rp(url)
		.then(function (html) {
			var $ = cheerio.load(html);
			var songs = [];
			var tableEl = $('#chartListObj tr').not('.recommend_type');

			if (opts.type === 'year')
				tableEl = $("#frm tbody tr");

		  tableEl.each(function(i, el) {
		  	if (i >= opts.limit) return;

		  	var song_info_el = $(el).find('.wrap_song_info');
		    var trackName = $(song_info_el).find('.ellipsis.rank01 strong a').text();
		    // remove last white space
		    trackName = trackName.replace(/(^[\s]+|[\s]+$)/g, '');
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
