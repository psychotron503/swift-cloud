'use strict';

const {
  ALBUM_PROP_NAME,
  SONG_PROP_NAME,
  ARTISTS_PROP_NAME,
  YEAR_PROP_NAME
} = require('../constants/catalog-constants');

/**
 * Get a single artist by name.
 * 
 * @param {Array} items
 *   The items to be queried.
 * @param {String} albumName
 *   The name of the artist to be retrieved.
 * 
 * @returns {Object}
 *   A single artist item.
 */
const findByName = (items, artistName) => {
  const singleArtist =
    items.filter(item => item[ARTISTS_PROP_NAME].includes(artistName));

  let artist;

  singleArtist.forEach(item => {
    if (!artist) {
      artist = {
        artist: artistName,
        albums: [
          item[ALBUM_PROP_NAME]
        ],
        songs: [
          item[SONG_PROP_NAME]
        ],
        years: [
          item[YEAR_PROP_NAME]
        ]
      };
    }
    else {
      // Ensure that the songs, albums and years arrays don't contain duplicates.
      if (!artist.songs.includes(item[SONG_PROP_NAME])) {
        artist.songs.push(item[SONG_PROP_NAME]);
      }
      if (!artist.albums.includes(item[ALBUM_PROP_NAME])) {
        artist.albums.push(item[ALBUM_PROP_NAME]);
      }
      if (!artist.years.includes(item[YEAR_PROP_NAME])) {
        artist.years.push(item[YEAR_PROP_NAME]);
      }
    }
  });

  return artist;
};

/**
 * Get all artists.
 * 
 * @param {Array} items
 *   The items to be queried.
 * 
 * @returns {Object}
 *   All artists.
 */
const getAll = (items) => {
  return items.reduce((artistList, item) => {
    for (let i = 0; i < item[ARTISTS_PROP_NAME].length; i++) {
      const artist = item[ARTISTS_PROP_NAME][i];

      if (!artistList[ARTISTS_PROP_NAME][artist]) {
        artistList[ARTISTS_PROP_NAME][artist] = {
          artist,
          albums: [
            item[ALBUM_PROP_NAME]
          ],
          songs: [
            item[SONG_PROP_NAME]
          ],
          years: [
            item[YEAR_PROP_NAME]
          ]
        };
      }
      else {
        // Ensure that the songs, albums and years arrays don't contain duplicates.
        if (!artistList[ARTISTS_PROP_NAME][artist].songs.includes(item[SONG_PROP_NAME])) {
          artistList[ARTISTS_PROP_NAME][artist].songs.push(item[SONG_PROP_NAME]);
        }
        if (!artistList[ARTISTS_PROP_NAME][artist].albums.includes(item[ALBUM_PROP_NAME])) {
          artistList[ARTISTS_PROP_NAME][artist].albums.push(item[ALBUM_PROP_NAME]);
        }
        if (!artistList[ARTISTS_PROP_NAME][artist].years.includes(item[YEAR_PROP_NAME])) {
          artistList[ARTISTS_PROP_NAME][artist].years.push(item[YEAR_PROP_NAME]);
        }
      }
    }

    return artistList;
  }, { artists: {} });
};


module.exports = {
  findByName,
  getAll
};