var cheerio = require('cheerio');
var rp = require('request-promise');

var opts = {
	limit: 50,
	type: 'daily',
	genre: 'KPOP',
	year: new Date().getFullYear(),
	month: new Date().getMonth()+1
};

/**
 * Callback for getting chart information.
 * @callback getSongsCallback
 * @param {Object} res - an array of songs.
 * @param {Object} err - error while requesting chart page.
 */

/**
 * Request options.
 * @typedef {Object} Options
 * @property {number} [limit=50] - option.limit Limit how many songs you will get (default 50, max 100).
 * @property {string} [type=daily] - option.type The type of chart. (daily, week, year, genre)
 * @property {string} [genre=KPOP] - option.genre The type of genre.
 * @property {number} [year=year of today] - option.year Year.
 * @property {number} [month=month of today] - option.month Month.
 */

/**
 * Parse melon chart.
 * @param {Options} option - Information about the chart you will request.
 * @param {getSongsCallback} callback - The callback that handles the response.
 */
function parse(opts, callback) {
	if (opts)
		opts = opts;
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
