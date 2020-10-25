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
 * Get a single song by name.
 * 
 * @param {Array} items
 *   The items to be queried.
 * @param {String} albumName
 *   The name of the song to be retrieved.
 * 
 * @returns {Object}
 *   A single song item.
 */
const findByName = (items, songName) => {
  const singleSong = items.find(item => item[SONG_PROP_NAME].trim() === songName.trim());

  if (singleSong) {
    return {
      [SONG_PROP_NAME]: singleSong[SONG_PROP_NAME],
      [ALBUM_PROP_NAME]: singleSong[ALBUM_PROP_NAME],
      [WRITERS_PROP_NAME]: singleSong[WRITERS_PROP_NAME],
      [ARTISTS_PROP_NAME]: singleSong[ARTISTS_PROP_NAME],
      [YEAR_PROP_NAME]: singleSong[YEAR_PROP_NAME],
      [PLAYS_JUNE_PROP_NAME]: singleSong[PLAYS_JUNE_PROP_NAME],
      [PLAYS_JULY_PROP_NAME]: singleSong[PLAYS_JULY_PROP_NAME],
      [PLAYS_AUGUST_PROP_NAME]: singleSong[PLAYS_AUGUST_PROP_NAME],
    };
  }

  return null;
};

/**
 * Get all songs.
 * 
 * @param {Array} items
 *   The items to be queried.
 * 
 * @returns {Object}
 *   All songs.
 */
const getAll = (items) => {
  const songList = {
    songs: {}
  };

  return items.reduce((songList, item) => {
    if (!songList.songs[item[SONG_PROP_NAME]]) {
      songList.songs[item[SONG_PROP_NAME]] = {
        [SONG_PROP_NAME]: item[SONG_PROP_NAME],
        [ALBUM_PROP_NAME]: item[ALBUM_PROP_NAME],
        [WRITERS_PROP_NAME]: item[WRITERS_PROP_NAME],
        [ARTISTS_PROP_NAME]: item[ARTISTS_PROP_NAME],
        [YEAR_PROP_NAME]: item[YEAR_PROP_NAME],
        [PLAYS_JUNE_PROP_NAME]: item[PLAYS_JUNE_PROP_NAME],
        [PLAYS_JULY_PROP_NAME]: item[PLAYS_JULY_PROP_NAME],
        [PLAYS_AUGUST_PROP_NAME]: item[PLAYS_AUGUST_PROP_NAME],
      };
    }
    else {
      songList.songs[item[SONG_PROP_NAME]].songs.push(item[SONG_PROP_NAME]);

      const writers = [
        ...item[WRITERS_PROP_NAME], 
        ...songList.songs[item[SONG_PROP_NAME]][WRITERS_PROP_NAME]];

      // Ensure that the writers array doesn't contain duplicates
      songList.songs[item.Song][WRITERS_PROP_NAME] = [...new Set(writers)];

      const artists = [
        ...item[ARTISTS_PROP_NAME],
        ...songList.songs[item[SONG_PROP_NAME]][ARTISTS_PROP_NAME]];

      // Ensure that the artists array doesn't contain duplicates
      songList.songs[item[SONG_PROP_NAME]][ARTISTS_PROP_NAME] = [...new Set(artists)];
    }

    return songList;
  }, songList);
};

module.exports = {
  getAll,
  findByName
};