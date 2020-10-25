'use strict';

const { limit } = require('../models/query-processor');
const { getAll, findByName } = require('../models/artist-model');

/**
 * Retrieve a single artist by name. The name will be retrieved from
 * the given request parameter.
 * 
 * @param {Object} req
 *   The request that contains the name of the artist to be found.
 * @param {Object} res
 *   The current response object. 
 * @param {Array} catalog
 *   The data to be queried.
 */
const getSingleArtist = (req, res, catalog) => {
  const artist = findByName(catalog, req.params.artist);

  if (!artist) {
    res.status(404).json({ 'message': 'Artist not found' });
  }
  else {
    res.status(200).json(artist);
  }
};

/**
 * Retrieve all artists in the given catalog.
 * 
 * @param {Object} req
 *  The current request object. 
 * @param {Object} res
 *   The current response object.  
 * @param {Array} catalog
 *   The data to be queried.
 */
const getAllArtists = (req, res, catalog) => {
  let allArtists = getAll(catalog);

  // Process 'limit' query parameter (if exists).
  allArtists = limit(req.query.limit, allArtists, 'artists');

  res.status(200).json(allArtists);
};


module.exports = {
  getSingleArtist,
  getAllArtists
};
