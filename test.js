const melon = require('./index');

test('Should obtain 50 songs from daily chart', async () => {
  const data = await melon.parse({
    limit: 50,
    type: 'daily',
    genre: 'KPOP',
    year: new Date().getFullYear(),
    month: new Date().getMonth()+1,
    term: ''
  });

  expect(Array.isArray(data)).toBe(true);
  expect(data).toHaveLength(50);
  expect(data[0]).toMatchObject({
    rank: 1,
    trackName: expect.any(String),
    artistName: expect.any(String),
    album: expect.any(String),
  });
});

test('Should obtain 10 songs by OST genre', async () => {
  const data = await melon.parse({
    limit: 10,
    type: 'genre',
    genre: 'DP0300',
  });

  expect(Array.isArray(data)).toBe(true);
  expect(data).toHaveLength(10);
  expect(data[0]).toMatchObject({
    rank: 1,
    trackName: expect.any(String),
    artistName: expect.any(String),
    album: expect.any(String),
  });
});

test('Should obtain 10 songs from year chart', async () => {
  const data = await melon.parse({
    limit: 10,
    type: 'year',
    genre: 'KPOP',
    year: 2015
  });

  expect(Array.isArray(data)).toBe(true);
  expect(data).toHaveLength(10);
  expect(data[0]).toMatchObject({
    rank: 1,
    trackName: expect.any(String),
    artistName: expect.any(String),
    album: expect.any(String),
  });
});
