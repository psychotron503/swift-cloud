/* eslint-disable no-undef */
const { formatCatalog } = require('../catalog-utils');
const {
  YEAR_PROP_NAME,
  ALBUM_PROP_NAME,
  SONG_PROP_NAME,
  ARTISTS_PROP_NAME,
  WRITERS_PROP_NAME
} = require('../../constants/catalog-constants');

describe('Formatters', () => {
  test('when catalog doesn\'t contain properties to format, processing is skipped', () => {
    const catalog = [{}];
    expect(formatCatalog(catalog)).toEqual(catalog);
  });

  test('when artist contains \'\\r\\n\' characters, artists are added to an array', () => {
    const catalog = [{
      Artist: 'Taylor Swift\r\nShawn Mendes'
    }];

    const result = formatCatalog(catalog);

    expect(result[0][ARTISTS_PROP_NAME])
      .toEqual(expect.arrayContaining(['Taylor Swift', 'Shawn Mendes']));
  });

  test('when artist doesn\'t contain \'\\r\\n\' characters, artists are added to an array', () => {
    const catalog = [{
      Artist: 'Taylor Swift'
    }];

    const result = formatCatalog(catalog);

    expect(result[0][ARTISTS_PROP_NAME])
      .toEqual(expect.arrayContaining(['Taylor Swift']));
  });

  test('when writer contains \'\\r\\n\' characters, writers are added to an array', () => {
    const catalog = [{
      Writer: 'Taylor Swift\r\nScott Harris'
    }];

    const result = formatCatalog(catalog);

    expect(result[0][WRITERS_PROP_NAME])
      .toEqual(expect.arrayContaining(['Taylor Swift', 'Scott Harris']));
  });

  test('when writer doesn\'t contain \'\\r\\n\' characters, writers are added to an array', () => {
    const catalog = [{
      Writer: 'Taylor Swift'
    }];

    const result = formatCatalog(catalog);

    expect(result[0][WRITERS_PROP_NAME])
      .toEqual(expect.arrayContaining(['Taylor Swift']));
  });

  test('when song is a number, space is added to end', () => {
    const catalog = [{
      Song: '22'
    }];

    const result = formatCatalog(catalog);

    expect(result[0][SONG_PROP_NAME]).toBe('22 ');
  });

  test('when song is not a number, \'song\' property is added and \'Song\' property is removed', () => {
    const catalog = [{
      Song: 'Girl at Home'
    }];

    const result = formatCatalog(catalog);

    expect(result[0][SONG_PROP_NAME]).toBe('Girl at Home');
  });

  test('when album is a number, space is included at end', () => {
    const catalog = [{
      Album: '1989'
    }];

    const result = formatCatalog(catalog);

    expect(result[0][ALBUM_PROP_NAME]).toBe('1989 ');
  });

  test('when album contains \'\\r\\n\' characters, lines are joined', () => {
    const catalog = [{
      Album: 'Red\r\n(Deluxe edition)'
    }];

    const result = formatCatalog(catalog);

    expect(result[0][ALBUM_PROP_NAME]).toBe('Red-(Deluxe edition)');
  });

  test('when album doesn\'t contain \'\\r\\n\' characters and is not a number, \'album\' is added and \'Album\' is removed', () => {
    const catalog = [{
      Album: 'Red'
    }];

    const result = formatCatalog(catalog);

    expect(result[0][ALBUM_PROP_NAME]).toBe('Red');
  });

  test('when \'Year\' is in catalog item, \'year\' property is added and \'Year\' property is removed', () => {
    const catalog = [{
      Year: '2020'
    }];

    const result = formatCatalog(catalog);

    expect(result[0][YEAR_PROP_NAME]).toBe('2020');
  });


  test('when item contains \'Plays - June\', it is replaced with \'plays_june\'', () => {
    const catalog = [{
      'Plays - June': '23'
    }];

    const result = formatCatalog(catalog);

    expect(result[0].plays_june).toBe('23');
    expect(result[0]['Plays - June']).toBeUndefined();
  });

  test('when item contains \'Plays - July\', it is replaced with \'plays_july\'', () => {
    const catalog = [{
      'Plays - July': '23'
    }];

    const result = formatCatalog(catalog);

    expect(result[0].plays_july).toBe('23');
    expect(result[0]['Plays - July']).toBeUndefined();
  });

  test('when item contains \'Plays - August\', it is replaced with \'plays_august\'', () => {
    const catalog = [{
      'Plays - August': '23'
    }];

    const result = formatCatalog(catalog);

    expect(result[0].plays_august).toBe('23');
    expect(result[0]['Plays - August']).toBeUndefined();
  });
});
