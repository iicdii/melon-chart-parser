# Melon-chart-parser

<p>
  <a href="https://www.npmjs.com/package/melon-chart-parser"><img src="https://img.shields.io/npm/v/melon-chart-parser.svg?style=flat-square"></a>
  <a href="https://www.npmjs.com/package/melon-chart-parser"><img src="https://img.shields.io/npm/dm/melon-chart-parser.svg?style=flat-square"></a>
</p>

## Installation

```
npm install melon-chart-parser
```
  
## Usage
```javascript
var melon = require('melon-chart-parser');

melon.parse(10, function(res, err) {
  if (err) return;

  console.log(res);
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
