const cheerio = require('cheerio');
const axios = require('axios');

const initialOptions = {
	limit: 50,
	type: 'daily',
	genre: 'KPOP',
	year: new Date().getFullYear(),
	month: new Date().getMonth()+1,
	term: ''
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
 * @param {Options} options - Information about the chart you will request.
 * @param {getSongsCallback} [callback] - The callback that handles the response.
 */
function parse(options, callback) {
	callback = callback || null;
	return new Promise(function(resolve, reject) {
		const opts = Object.assign({}, initialOptions, options);

		if (!opts.limit) {
			opts.limit = 50;
		} else if (opts.limit > 100) {
			opts.limit = 100;
		} else if (opts.limit <= 0) {
			const errorMessage = 'limit must be at least 0';
			if (callback)
				callback(null, errorMessage);
			reject(errorMessage);
		}

		let url = 'https://www.melon.com/chart/day/index.htm?idx=1&moved=Y';
		const genre = opts.genre;

		switch(opts.type) {
			case 'daily':
				break;
			case 'week':
				url = 'https://www.melon.com/chart/week/index.htm';
				break;
			case 'month':
				if (!opts.month || !opts.year) break;
				const month = ("0" + (opts.month)).slice(-2);

				url = 'https://www.melon.com/chart/month/index.htm#params[idx]=1&params[rankMonth]=' + opts.year + month;
				break;
			case 'year':
				let year = opts.year;

				if (!year || !genre) break;
				if (year === new Date().getFullYear()) year--;

				url = 'https://www.melon.com/chart/age/list.htm?moved=Y&chartType=YE&chartGenre=' + genre + '&chartDate=' + year;
				break;
			case 'genre':
				if (!genre) break;

				url = 'https://www.melon.com/chart/week/index.htm?classCd=' + genre;

				break;
			case 'artist':
				const term = opts.term;

				if (!term) break;

				url = 'https://www.melon.com/search/song/index.htm?q='+term+'&section=artist&searchGnbYn=Y&kkoSpl=Y&kkoDpType=&ipath=srch_form';
				break;
			default:
				break;
		}

		url = encodeURI(url);

		axios.get(url)
			.then(function (res) {
				const $ = cheerio.load(res.data);
				const songs = [];
				let tableEl;

				if (opts.type === 'artist') {
					tableEl = $("#frm_defaultList tbody tr");

					tableEl.each(function(i, el) {
						if (i >= opts.limit) return;

						const song_info_el = $(el).find('.wrap.pd_none');
						let trackName =
							$(song_info_el).find('.ellipsis a.fc_gray').text();
						// remove last white space
						trackName = trackName.replace(/(^[\s]+|[\s]+$)/g, '');

						const artist_info_el = $(el).find('.wrap.wrapArtistName');

						let artistName = '';
						$(artist_info_el).find('.ellipsis > a.fc_mgray')
							.each(function(i, ele) {
								if (i > 0)
									artistName += ', ';

								artistName += $(ele).text();
							});

						const album_info_el = $(el).find('.wrap:not(.wrapArtistName)');
						const albumName =
							$(album_info_el).find('.ellipsis a.fc_mgray').text();

						songs.push({
							'rank': i+1,
							'trackName': trackName,
							'artistName': artistName ? artistName : opts.term,
							'album': albumName
						});
					});
				} else {
					tableEl = $("#frm tbody tr");

					tableEl.each(function(i, el) {
						if (i >= opts.limit) return;

						const song_info_el = $(el).find('.wrap_song_info');
						let trackName =
							$(song_info_el).find('.ellipsis.rank01 strong a').text() ||
							$(song_info_el).find('.ellipsis.rank01 span a').text();
						// remove last white space
						trackName = trackName.replace(/(^[\s]+|[\s]+$)/g, '');
						let artistName = '';

						$(song_info_el).find('.ellipsis.rank02 .checkEllipsis')
							.children()
							.each(function(i, ele) {
								if (i > 0)
									artistName += ', ';

								artistName += $(ele).text();
							});
						const albumName = $(song_info_el).find('.ellipsis.rank03 a').text();

						songs.push({
							'rank': i+1,
							'trackName': trackName,
							'artistName': artistName,
							'album': albumName
						});
					});
				}

				if (callback)
					callback(songs, null);

				resolve(songs);
			})
			.catch(function (err) {
				if (callback)
					callback(null, err);

				reject(err);
			});
	});
}

module.exports.parse = parse;
