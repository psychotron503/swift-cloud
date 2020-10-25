'use strict';

const { SONG_PROP_NAME } = require('../constants/catalog-constants');
const { processQParameter, sort, limit } = require('../models/query-processor');
const { getAll, findByName } = require('../models/song-model');

/**
 * Retrieve a single song by name. The name will be retrieved from
 * the given request parameter.
 * 
 * @param {Object} req
 *   The request that contains the name of the song to be found.
 * @param {Object} res
 *   The current response object. 
 * @param {Array} catalog
 *   The data to be queried. 
 */
const getSingleSong = (req, res, catalog) => {
  const song = findByName(catalog, req.params.song);

  if (!song) {
    res.status(404).json({ 'message': 'Song not found' });
  }
  else {
    res.status(200).json(song);
  }
};

/**
 * Retrieve all songs in the given catalog.
 * 
 * @param {Object} req
 *  The current request object. 
 * @param {Object} res
 *   The current response object.  
 * @param {Array} catalog
 *   The data to be queried.
 */
const getAllSongs = (req, res, catalog) => {

  // Start by processing the 'q' query paramter if it exists. Otherwise just use full catalog.
  let songs = processQParameter(req.query.q, SONG_PROP_NAME, catalog) || catalog;

  // Process 'sort' query parameter if exists.
  sort(req.query.sort, songs);

  let allSongs = getAll(songs);

  // Process 'limit' query parameter if exists.
  allSongs = limit(req.query.limit, allSongs, 'songs');

  res.status(200).json(allSongs);
};

module.exports = {
  getAllSongs,
  getSingleSong
};
