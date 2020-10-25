'use strict';

const { ALBUM_PROP_NAME } = require('../constants/catalog-constants');
const { processQParameter, sort, limit } = require('../models/query-processor');
const { getAll, findByName } = require('../models/album-model');

/**
 * Retrieve a single album by name. The name will be retrieved from
 * the given request parameter. 
 * 
 * @param {Object} req
 *   The request that contains the name of the album to be found.
 * @param {Object} res
 *   The current response object. 
 * @param {Array} catalog
 *   The data to be queried.
 */
const getSingleAlbum = (req, res, catalog) => {
  const album = findByName(catalog, req.params.album);

  if (!album) {
    res.status(404).json({ 'message': 'Album not found' });
  }
  else {
    res.status(200).json(album);
  }
};

/**
 * Retrieve all albums in the given catalog.
 * 
 * @param {Object} req
 *  The current request object. 
 * @param {Object} res
 *   The current response object.  
 * @param {Array} catalog
 *   The data to be queried.
 */
const getAllAlbums = (req, res, catalog) => {

  // Start by processing the 'q' query paramter if it exists. 
  // Otherwise just use full catalog.
  let albums = 
    processQParameter(req.query.q, ALBUM_PROP_NAME, catalog) || catalog;

  // Process 'sort' query parameter (if exists).
  sort(req.query.sort, albums);

  let allAlbums = getAll(albums);

  // Process 'limit' query parameter (if exists).
  allAlbums = limit(req.query.limit, allAlbums, 'albums');

  res.status(200).json(allAlbums);
};

module.exports = {
  getAllAlbums,
  getSingleAlbum
};
