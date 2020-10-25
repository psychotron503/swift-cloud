'use strict';

const {
  ALBUM_PROP_NAME,
  SONG_PROP_NAME,
  WRITERS_PROP_NAME,
  ARTISTS_PROP_NAME,
  YEAR_PROP_NAME
} = require('../constants/catalog-constants');

/**
 * Get a single album by name.
 * 
 * @param {Array} items
 *   The items to be queried.
 * @param {String} albumName
 *   The name of the album to be retrieved.
 * 
 * @returns {Object}
 *   A single album item.
 */
const findByName = (items, albumName) => {
  const singleAlbum =
    items.filter(item => item[ALBUM_PROP_NAME].trim() === albumName.trim());

  let album;

  singleAlbum.forEach(item => {
    if (!album) {
      album = {
        [ALBUM_PROP_NAME]: item[ALBUM_PROP_NAME],
        songs: [
          item[SONG_PROP_NAME]
        ],
        [WRITERS_PROP_NAME]: item[WRITERS_PROP_NAME],
        [ARTISTS_PROP_NAME]: item[ARTISTS_PROP_NAME],
        [YEAR_PROP_NAME]: item[YEAR_PROP_NAME]
      };
    }
    else {
      album.songs.push(item[SONG_PROP_NAME]);

      // Ensure that the writers array doesn't contain duplicates.
      const writers = [...item[WRITERS_PROP_NAME], ...album[WRITERS_PROP_NAME]];
      album[WRITERS_PROP_NAME] = [...new Set(writers)];

      // Ensure that the artists array doesn't contain duplicates.
      const artists = [...item[ARTISTS_PROP_NAME], ...album[ARTISTS_PROP_NAME]];
      album[ARTISTS_PROP_NAME] = [...new Set(artists)];
    }
  });

  return album;
};

/**
 * Get all albums.
 * 
 * @param {Array} items
 *   The items to be queried.
 * 
 * @returns {Object}
 *   All albums.
 */
const getAll = (items) => {
  return items.reduce((albumList, item) => {
    if (!albumList.albums[item[ALBUM_PROP_NAME]]) {
      albumList.albums[item[ALBUM_PROP_NAME]] = {
        [ALBUM_PROP_NAME]: item[ALBUM_PROP_NAME],
        songs: [
          item[SONG_PROP_NAME]
        ],
        [WRITERS_PROP_NAME]: item[WRITERS_PROP_NAME],
        [ARTISTS_PROP_NAME]: item[ARTISTS_PROP_NAME],
        [YEAR_PROP_NAME]: item[YEAR_PROP_NAME]
      };
    }
    else {
      albumList.albums[item[ALBUM_PROP_NAME]].songs.push(item[SONG_PROP_NAME]);

       
      const writers = [
        ...item.writers,
        ...albumList.albums[item[ALBUM_PROP_NAME]][WRITERS_PROP_NAME]];

      // Ensure that the writers array doesn't contain duplicates.
      albumList.albums[item[ALBUM_PROP_NAME]][WRITERS_PROP_NAME] = [...new Set(writers)];

      const artists = [
        ...item[ARTISTS_PROP_NAME],
        ...albumList.albums[item[ALBUM_PROP_NAME]][ARTISTS_PROP_NAME]];

      // Ensure that the artists array doesn't contain duplicates.
      albumList.albums[item[ALBUM_PROP_NAME]][ARTISTS_PROP_NAME] = [...new Set(artists)];
    }

    return albumList;
  }, { albums: {} });
};


module.exports = {
  getAll,
  findByName
};