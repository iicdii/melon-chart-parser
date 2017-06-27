# Melon Chart Parser

<p>
  <a href="https://www.npmjs.com/package/melon-chart-parser"><img src="https://img.shields.io/npm/v/melon-chart-parser.svg?style=flat-square"></a>
  <a href="https://www.npmjs.com/package/melon-chart-parser"><img src="https://img.shields.io/npm/dm/melon-chart-parser.svg?style=flat-square"></a>
</p>

## What's Melon Chart Parser?
Melon Chart Parser is a module that parses the melon chart and obtains the data of the songs.

## Installation

```
npm install melon-chart-parser
```
  
## Examples
### Get 10 songs from daily melon chart.
```javascript
// var something = require('melon-chart-parser');
var melon = require('melon-chart-parser');

var opts = {
  limit: 10,
  type: 'daily'
};

// callback style
melon.parse(opts, function(res, err) {
  if (err) return;

  console.log(res);
});

// promise style
melon.parse(opts)
  .then(function(res) {
    console.log(res);
  })
  .catch(function(err) {
    console.log(err);
  });
```

Output should be like

```javascript
[ { rank: 1,
    trackName: '남이 될 수 있을까',
    artistName: '볼빨간사춘기, 스무살',
    album: '남이 될 수 있을까' },
  { rank: 2,
    trackName: '무제(無題) (Untitled, 2014)',
    artistName: 'G-DRAGON',
    album: '권지용' },
  { rank: 3,
    trackName: '처음부터 너와 나',
    artistName: '볼빨간사춘기',
    album: '군주 - 가면의 주인 OST Part.2' },
  { rank: 4,
    trackName: 'Shape of You',
    artistName: 'Ed Sheeran',
    album: '÷ (Deluxe)' },
  { rank: 5,
    trackName: 'SIGNAL',
    artistName: 'TWICE (트와이스)',
    album: 'SIGNAL' },
  { rank: 6,
    trackName: '오늘 취하면 (Feat. 창모) (Prod. SUGA)',
    artistName: '수란 (SURAN)',
    album: 'WINE' },
  { rank: 7,
    trackName: 'New Face',
    artistName: '싸이 (PSY)',
    album: 'PSY 8th 4X2=8' },
  { rank: 8,
    trackName: 'NEVER',
    artistName: '국민의 아들',
    album: 'PRODUCE 101 - 35 Boys 5 Concepts' },
  { rank: 9,
    trackName: 'I LUV IT',
    artistName: '싸이 (PSY)',
    album: 'PSY 8th 4X2=8' },
  { rank: 10,
    trackName: '팔레트 (Feat. G-DRAGON)',
    artistName: '아이유',
    album: 'Palette' } ]
```



### Get 50 songs of month chart.
```javascript
var melon = require('melon-chart-parser');

var opts = {
  limit: 50,
  type: 'month',
  month: 4
};

melon.parse(opts function(res, err) {
  if (err) return;

  console.log(res);
});
```

### Get 100 songs of year chart.
```javascript
var melon = require('melon-chart-parser');

var opts = {
  limit: 100,
  type: 'year',
  genre: 'KPOP', // or 'POP'
  year: 2015
};

melon.parse(opts function(res, err) {
  if (err) return;

  console.log(res);
});
```

### Get 100 songs of this week's chart by OST genre.
```javascript
var melon = require('melon-chart-parser');

var opts = {
  limit: 100,
  type: 'genre',
  genre: 'DP0300', // A list of possible genres can be read at the bottom of the document.
};

melon.parse(opts, function(res, err) {
  if (err) return;

  console.log(res);
});
```

## Functions

<dl>
<dt><a href="#parse">parse(option, callback)</a></dt>
<dd><p>Parse melon chart.</p>
</dd>
</dl>

## Typedefs

<dl>
<dt><a href="#getSongsCallback">getSongsCallback</a> : <code>function</code></dt>
<dd><p>Callback for getting chart information.</p>
</dd>
<dt><a href="#Options">Options</a> : <code>Object</code></dt>
<dd><p>Request options.</p>
</dd>
</dl>

<a name="parse"></a>

## parse(option, callback)
Parse melon chart.

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| option | [<code>Options</code>](#Options) | Information about the chart you will request. |
| callback | [<code>getSongsCallback</code>](#getSongsCallback) | The callback that handles the response. |

<a name="getSongsCallback"></a>

## getSongsCallback : <code>function</code>
Callback for getting chart information.

**Kind**: global typedef  

| Param | Type | Description |
| --- | --- | --- |
| res | <code>Object</code> | an array of songs. |
| err | <code>Object</code> | error while requesting chart page. |

<a name="Options"></a>

## Options : <code>Object</code>
Request options.

**Kind**: global typedef  
**Properties**

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| limit | <code>number</code> | <code>50</code> | option.limit Limit how many songs you will get (default 50, max 100). |
| type | <code>string</code> | <code>&quot;daily&quot;</code> | option.type The type of chart. (daily, week, year, genre) |
| genre | <code>string</code> | <code>&quot;KPOP&quot;</code> | option.genre The type of genre. |
| year | <code>number</code> | <code>year of today</code> | option.year Year. |
| month | <code>number</code> | <code>month of today</code> | option.month Month. |

## Genre list
when type is 'genre' you can send genre by genre parameter below value.

```
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
```

or if type is 'year' you can send genre parameter below value.

```
'KPOP' (KPOP),
'POP' (POP)
```
