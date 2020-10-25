# Installation
 - Run 'npm install' in root of application.

# Running the Application
 - The package.json file contains several scripts to run the application:

   * To run a production build - 'npm run start'.
   * To run a development build - 'npm run dev'.
   * To run a development build with --inspect flag for debugging - 'npm run debug'.
   * To run all unit tests with code coverage - 'npm run test'.
   * To run eslint on all code in src directory - 'npm run lint'.

# Invoking the API
The following requests can be sent to invoke the API.

## Endpoints

* (GET) /catalog/v1/albums
  - Retrieve all albums.
* (GET) /catalog/v1/albums/{album-name}
  - Retrieve a single album by name.
* (GET) /catalog/v1/songs
  - Retrieve all songs.
* (GET) /catalog/v1/songs/{song-name}
  - Retrieve a single song by name.
* (GET) /catalog/v1/artists
  - Retrieve all artists.
* (GET) /catalog/v1/artists/{artist-name}
  - Retrieve a single song by name.

* http://localhost:5000/api-docs
  - Open this in browser to view swagger documentation.

## Parameters
When invoking any of the albums or songs endpoints, a 'q' parameter
can be included. This provides a MongoDB query style to the API.

### Examples

* To get all songs written in 2019:
  - /catalog/v1/songs?q={"year": {"$eq": 2019}}

* To get all albums written before 2019
  - /catalog/v1/albums?q={"year": {"$lt": 2019}}

* To get all songs written after 2019
  - /catalog/v1/songs?q={"year": {"$gt": 2019}}

* To get all songs with 10 or less plays in June
  - /catalog/v1/albums?q={"plays_june": {"$lte": 10}}

* To get all songs with 100 or more plays in July
  - /catalog/v1/songs?q={"plays_july": {"$gte": 100}}

* To get all albums written between 2015 and 2018
  - /catalog/v1/albums?q={"year": {"$bt": [2015, 2018]}}

The albums and songs can be sorted:

* To sort all songs by year ascending (ascending is default sort order):
  - /catalog/v1/songs?sort=year

* To sort all songs by year descending:
  - /catalog/v1/songs?sort=year:desc

* To sort all songs written between 2015 and 2018 by year in descending order:
  - /catalog/v1/albums?q={"year": {"$bt": [2015, 2018]}}&sort=year:desc

The albums and songs can have a limit on results to return:

* To get the top 3 songs played in July:
  - /catalog/v1/songs?sort=plays_july:desc&limit=3

* To get Taylor Swift's first 5 albums:.
  - /catalog/v1/albums?sort=year&limit=5
 
# Improvements or Next Steps

  * Update root catalog endpoint to retrieve data from all endpoints e.g.:

    (GET) /catalog/v1/
    
    response:
    {
      songs: {...},
      albums: {...},
      artists: {...},
      writers: {...}
    }

  * Add endpoint resources for retrieving all writers and single writer.

  * Update the get all artists endpoint to use the sort query parameter.

  * Build out the querying utility to be more flexible e.g. including &and/$or etc.

  * Add pagination controls.

  * Add unit tests to all cover whole application. Currently only 'utils' module has tests.

  * Add more validation. For example, validate request query fields.

  * Fix some of the initial data transformation. For example, artists and writers 
    from the spreadsheet are strings in multiple formats such as:

     - 'Zayn and Taylor Swift'
     - 'featuring Keith Urban'
    
    Also some songs don't belong to and album. These songs have 'None' as their album.

  * Ideally, the data would be in a database as it would make querying much easier. I would
    maybe look at refactoring the application to use a database.

  * Maybe refactor the application to TypeScript.


# Full Test URLs

## Retrieve data specific to albums
* http://localhost:5000/catalog/v1/albums
* http://localhost:5000/catalog/v1/albums/Bigger
* http://localhost:5000/catalog/v1/albums?q={"year": {"$eq": 2019}}
* http://localhost:5000/catalog/v1/albums?q={"year": {"$lt": 2019}}
* http://localhost:5000/catalog/v1/albums?q={"year": {"$gt": 2019}}
* http://localhost:5000/catalog/v1/albums?q={"year": {"$lte": 2019}}
* http://localhost:5000/catalog/v1/albums?q={"year": {"$gte": 2019}}
* http://localhost:5000/catalog/v1/albums?q={"year": {"$bt": [2018, 2020]}}
* http://localhost:5000/catalog/v1/albums?sort=year
* http://localhost:5000/catalog/v1/albums?sort=year:desc
* http://localhost:5000/catalog/v1/albums?sort=year:desc&limit=3
* http://localhost:5000/catalog/v1/albums?q={"year": {"$bt": [2018, 2020]}}&sort=year&limit=4

## Retrieve data specific to songs
* http://localhost:5000/catalog/v1/songs
* http://localhost:5000/catalog/v1/songs/Babe
* http://localhost:5000/catalog/v1/songs?q={"year": {"$eq": 2019}}
* http://localhost:5000/catalog/v1/songs?q={"year": {"$lt": 2019}}
* http://localhost:5000/catalog/v1/songs?q={"year": {"$gt": 2019}}
* http://localhost:5000/catalog/v1/songs?q={"year": {"$lte": 2019}}
* http://localhost:5000/catalog/v1/songs?q={"year": {"$gte": 2019}}
* http://localhost:5000/catalog/v1/songs?q={"year": {"$bt": [2018, 2020]}}
* http://localhost:5000/catalog/v1/songs?q={"plays_june": {"$eq": 19}}
* http://localhost:5000/catalog/v1/songs?q={"plays_june": {"$lt": 10}}
* http://localhost:5000/catalog/v1/songs?q={"plays_july": {"$gt": 100}}
* http://localhost:5000/catalog/v1/songs?q={"plays_july": {"$lte": 22}}
* http://localhost:5000/catalog/v1/songs?q={"plays_august": {"$gte": 101}}
* http://localhost:5000/catalog/v1/songs?q={"plays_august": {"$bt": [101, 102]}}
* http://localhost:5000/catalog/v1/songs?sort=year
* http://localhost:5000/catalog/v1/songs?sort=year:desc
* http://localhost:5000/catalog/v1/songs?sort=year:desc&limit=3
* http://localhost:5000/catalog/v1/songs?q={"year": {"$bt": [2018, 2020]}}&sort=year&limit=4
* http://localhost:5000/catalog/v1/songs?q={"plays_august": {"$bt": [101, 106]}}&sort=plays_august
* http://localhost:5000/catalog/v1/songs?q={"plays_august": {"$bt": [101, 102]}}&sort=plays_august:desc

## Retrieve data specific to artists
* http://localhost:5000/catalog/v1/artists
* http://localhost:5000/catalog/v1/artists/Sugarland
* http://localhost:5000/catalog/v1/artists?limit=3
