'use strict';

const express = require('express');
const csvtojson = require('csvtojson');

const catalogUtils = require('../utils/catalog-utils');
const catalogConstants = require('../constants/catalog-constants');

const { getAllAlbums, getSingleAlbum } = require('../controllers/album-controller');
const { getSingleSong, getAllSongs } = require('../controllers/song-controller');
const { getSingleArtist, getAllArtists } = require('../controllers/artist-controller');

const app = express();
const router = express.Router();

/**
 * Middleware that will transform the CSV file into JSON.
 * 
 * Once the data has been transformed, it will be stored in
 * app.locals.catalog.
 */
router.use(async (req, res, next) => {
  if (!app.locals.catalog) {
    const catalog = await csvtojson().fromFile(catalogConstants.DATA_FILE);
    app.locals.catalog = catalogUtils.formatCatalog(catalog);
  }

  next();
});

router.get('/v1', (req, res) => {
  const response = {
    endpoints: {
      getAllSongs: '<server>:<port>/catalog/v1/songs',
      getSingleSong: '<server>:<port>/catalog/v1/songs/{song}',
      getAllAlbums: '<server>:<port>/catalog/v1/albums',
      getSingleAlbum: '<server>:<port>/catalog/v1/albums/{album}',
      getAllArtists: '<server>:<port>/catalog/v1/artists',
      getSingleArtist: '<server>:<port>/catalog/v1/artists/{artist}',
    }
  };

  res.status(200).json(response);
});

router.get('/v1/albums', (req, res) => {
  getAllAlbums(req, res, app.locals.catalog);
});

router.get('/v1/albums/:album', (req, res) => {
  getSingleAlbum(req, res, app.locals.catalog);
});

router.get('/v1/songs', (req, res) => {
  getAllSongs(req, res, app.locals.catalog);
});

router.get('/v1/songs/:song', (req, res) => {
  getSingleSong(req, res, app.locals.catalog);
});

router.get('/v1/artists', (req, res) => {
  getAllArtists(req, res, app.locals.catalog);
});

router.get('/v1/artists/:artist', (req, res) => {
  getSingleArtist(req, res, app.locals.catalog);
});

module.exports = router;
