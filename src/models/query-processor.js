/* eslint-disable quotes */
'use strict';

const {
  YEAR_PROP_NAME,
  PLAYS_JUNE_PROP_NAME,
  PLAYS_JULY_PROP_NAME,
  PLAYS_AUGUST_PROP_NAME
} = require('../constants/catalog-constants');

/**
 * The 'q' query parameter adds a MongoDB query style to the API.
 * This function parses the object assigned to the 'q' parameter 
 * to filter the data to be returned.
 * 
 * @param {String} qParameter
 *   The query to be used to filter the results.
 * @param {String} resource
 *   The name of resource being processed i.e. 'album' or 'song'.
 * @param {Array} catalog
 *   The items to be queried.
 * 
 * @returns {Array}
 *   If 'q' parameter exists with valid request data, the processed 
 *   array of items is returned. Otherwise, the original items
 *   are returned.
 */
const processQParameter = (qParameter, resource, catalog) => {
  let allItems;

  if (qParameter) {
    const q = JSON.parse(qParameter);
    const { year, plays_june,  plays_july,  plays_august } = q;

    if (year) {
      allItems = _getByComparison(year, YEAR_PROP_NAME, resource, catalog);
    }
    if (plays_june) {
      allItems = _getByComparison(plays_june, PLAYS_JUNE_PROP_NAME, resource, catalog);
    }
    if (plays_july) {
      allItems = _getByComparison(plays_july, PLAYS_JULY_PROP_NAME, resource, catalog);
    }
    if (plays_august) {
      allItems = _getByComparison(plays_august, PLAYS_AUGUST_PROP_NAME, resource, catalog);
    }
  }

  return allItems || catalog;
};

/**
 * Sort the given items by the given sort parameter.
 * 
 * By default, the sort will be ascending. The sort will be descending
 * when then sort parameter contains ':desc'. For example, to sort by year:
 * 
 * ?sort=year:desc
 * 
 * @param {String} sortParameter
 *   The property that the sort will run against.
 * @param {Array} items
 *   The data to be sorted.
 * 
 * @returns {Array}
 *   A sorted array of items
 */
const sort = (sortParameter, items) => {
  if (sortParameter && items) {
    const sortField = sortParameter.split(':')[0];
    const sortDirection = sortParameter.split(':')[1];

    // Note that some songs/albums will be numbers as strings e.g. '1989'.
    items.sort((itemA, itemB) => {
      return sortDirection === 'desc'
        ? itemB[sortField].localeCompare(itemA[sortField], undefined, {numeric: true})
        : itemA[sortField].localeCompare(itemB[sortField], undefined, {numeric: true});
    });
  }
};

/**
 * Limit the number of results to be returned.
 * 
 * @param {String} limitParameter
 *   The number of items that will be returned.
 * @param {Array} items
 *   The data to be processed.
 * 
 * @returns {Array}
 *   A number of items based on the limit parameter.
 */
const limit = (limitParameter, items, resource) => {
  if (limitParameter && items) {
    const limit = parseInt(limitParameter);
    let result = {};
    let counter = 0;

    for (const [key, value] of Object.entries(items[resource])) {
      result[key] = value;

      if (++counter === limit) {
        break;
      }
    }

    items[resource] = result;
  }

  return items;
};

/**
 * Filter all items in given catalog using a particular comparison operator.
 * 
 * Available operators include:
 * 
 * - "$eq" This is an equals operator e.g. a === b
 * - "$lt" This is less than operator e.g. a < b
 * - "$gt" This is a greater than operator e.g. a > b
 * - "$lte" This is a less than or equals operator e.g. a <= b
 * - "$gte" This is a greater than or equals operator e.g. a >= b
 * - "$bt" This is a between operator e.g. a >= b && a <= c
 * 
 * @param {String} operator
 *   The comparison operator to be used. 
 * @param {String} fieldName
 *   The name ot the field that will be compared.
 * @param {String} resource
 *   The name of the resource to be returned i.e. 'album' or 'song'. 
 * @param {Array} catalog
 *   The data to be processed.
 * 
 * @returns {Array}
 *   A filtered array of items.
 */
const _getByComparison = (operator, fieldName, resource, catalog) => {
  let allItems;

  if (operator) {
    if (operator["$eq"]) {
      allItems = catalog.filter(item => {
        if (parseInt(item[fieldName]) === operator["$eq"]) {
          return item[resource];
        }
      });
    }
    else if (operator["$lt"]) {
      allItems = catalog.filter(item => {
        if (parseInt(item[fieldName]) < operator["$lt"]) {
          return item[resource];
        }
      });
    }
    else if (operator["$lte"]) {
      allItems = catalog.filter(item => {
        if (parseInt(item[fieldName]) <= operator["$lte"]) {
          return item[resource];
        }
      });
    }
    else if (operator["$gt"]) {
      allItems = catalog.filter(item => {
        if (parseInt(item[fieldName]) > operator["$gt"]) {
          return item[resource];
        }
      });
    }
    else if (operator["$gte"]) {
      allItems = catalog.filter(item => {
        if (parseInt(item[fieldName]) >= operator["$gte"]) {
          return item[resource];
        }
      });
    }
    else if (operator["$bt"]) {
      allItems = catalog.filter(item => {

        if (parseInt(item[fieldName]) >= operator["$bt"][0]
          && parseInt(item[fieldName]) <= operator["$bt"][1]) {
          return item[resource];
        }
      });
    }
  }

  return allItems;
};

module.exports = {
  processQParameter,
  sort,
  limit
};
