'use strict';

const {
  ALBUM_PROP_NAME,
  SONG_PROP_NAME,
  WRITERS_PROP_NAME,
  ARTISTS_PROP_NAME,
  YEAR_PROP_NAME,
  PLAYS_JUNE_PROP_NAME,
  PLAYS_JULY_PROP_NAME,
  PLAYS_AUGUST_PROP_NAME
} = require('../constants/catalog-constants');

/**
 * Transform artist from original csv format into
 * more consumable JSON format.
 * 
 * @param {Object} item
 *   The item that contains the artist to be transformed.
 */
const _formatArtist = item => {
  if (item.Artist) {
    if (item.Artist.includes('\r\n')) {
      const artists = item.Artist.split('\r\n');
      item[ARTISTS_PROP_NAME] = artists;
    }
    else {
      item[ARTISTS_PROP_NAME] = [item.Artist];
    }

    delete item.Artist;
  }
};

/**
 * Transform writer from original csv format into
 * more consumable JSON format.
 * 
 * @param {Object} item
 *   The item that contains the writer to be transformed.
 */
const _formatWriter = item => {
  if (item.Writer) {
    if (item.Writer.includes('\r\n')) {
      const writers = item.Writer.split('\r\n');

      item[WRITERS_PROP_NAME] = writers;
    }
    else {
      item[WRITERS_PROP_NAME] = [item.Writer];
    }

    delete item.Writer;
  }
};

/**
 * Transform song from original csv format into
 * more consumable JSON format.
 * 
 * @param {Object} item
 *   The item that contains the song to be transformed.
 */
const _formatSong = item => {
  if (item.Song) {
    if (!isNaN(item.Song)) {
      item[SONG_PROP_NAME] = `${item.Song} `;
    }
    else {
      item[SONG_PROP_NAME] = item.Song;
    }

    delete item.Song;
  }
};

/**
 * Transform album from original csv format into
 * more consumable JSON format.
 * 
 * @param {Object} item
 *   The item that contains the album to be transformed.
 */
const _formatAlbum = item => {
  if (item.Album) {
    if (item.Album.includes('\r\n')) {
      const albumArr = item.Album.split('\r\n');

      item[ALBUM_PROP_NAME] = `${albumArr[0]}-${albumArr[1]}`;
    }
    else if (!isNaN(item.Album)) {
      item[ALBUM_PROP_NAME] = `${item.Album} `;
    }
    else {
      item[ALBUM_PROP_NAME] = item.Album;
    }

    delete item.Album;
  }
};

/**
 * Transform year from original csv format into
 * more consumable JSON format.
 * 
 * @param {Object} item
 *   The item that contains the year to be transformed.
 */
const _formatYear = item => {
  if (item.Year) {
    item[YEAR_PROP_NAME] = item.Year;
    delete item.Year;
  }
};

/**
 * Transform 'Plays - XXX' from original csv format into
 * more consumable JSON format.
 * 
 * @param {Object} item
 *   The item that contains the 'Plays - XXX' to be transformed. 
 */
const _formatPlays = item => {
  if (item['Plays - June']) {
    item[PLAYS_JUNE_PROP_NAME] = item['Plays - June'];
    delete item['Plays - June'];
  }

  if (item['Plays - July']) {
    item[PLAYS_JULY_PROP_NAME] = item['Plays - July'];
    delete item['Plays - July'];
  }

  if (item['Plays - August']) {
    item[PLAYS_AUGUST_PROP_NAME] = item['Plays - August'];
    delete item['Plays - August'];
  }
};

/**
 * Takes the catalog data in with names in original csv format
 * and transforms those names into a more consumable format.
 * 
 * @param {Array} catalog
 *   The data to be transformed.
 * 
 * @returns {Array}
 *   A formatted catalog of items.
 */
module.exports.formatCatalog = (catalog) => {
  return catalog.map(item => {
    _formatArtist(item);
    _formatWriter(item);
    _formatSong(item);
    _formatAlbum(item);
    _formatYear(item);
    _formatPlays(item);

    return item;
  });
};
