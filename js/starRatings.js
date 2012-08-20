/*!
 * starRatings.js
 *
 * This Javascript function creates a histogram for star rating. Typically used for user reviews.
 *
 * Require the Flotr2 library: http://humblesoftware.com/flotr2/
 *
 * See index.html for example usage.
 *
 * Copyright (c) 2012, Leo Neumeyer
 * http://4lunas.org
 *
 * Distributed under the MIT license. See LICENSE file for details.
 *
 * All rights reserved.
 */
function starRatings(params) {

  var
  container = document.getElementById('container');

  // This is the raw data. Index 0 corresponds to rating = "1 star".
  //var ratingsCount = [1, 10, 30, 110, 30];
  var ratingsCount = params.ratingsCount;
  if(params.ratingsCount === undefined) {
    // TODO Error condition. We need data.
    // TODO validate input data.

  }

  // Use default labels if undefined.
  var labels = params.labels;
  if(params.labels === undefined) {
    labels = ['1 star', '2 star', '3 star', '4 star', '5 star'];
  }

  // Put data in Flotr2 format.
  var d1 = [];
  var d2 = [];
  var l1 = [];
  for (var i = 0; i < 5; i++) {
    d1.push([ratingsCount[i], i]);
  }

  // Sum all the counts.
  var sum = 0;
  for (i = 0; i < 5; i++) {
    sum = sum + d1[i][0];
  }

  // Compute marker position and complement to sum.
  for (i = 0; i < 5; i++) {
    l1.push([sum, i]);
    d2.push([sum - d1[i][0], i]);
  }

  var properties = {
    colors: ['#000000', '#D0D0D0'],
    fontColor: '#000000',
    fontSize: 8,
    grid: {
      verticalLines: false,
      horizontalLines: false,
      labelMargin: 10,
      color: '#000000'
    },
    xaxis: {
      showLabels: false,
      min: 0,
      max: sum
    },
    yaxis: {
      min: -0.46,
      max: 4.5,
      noTicks: 5,
      ticks: [
        [0, labels[0]],
        [1, labels[1]],
        [2, labels[2]],
        [3, labels[3]],
        [4, labels[4]]
      ]
    }
  };

  // Use parameters passed to this function when available.
  for (var prop in params) {
   properties[prop] = params[prop];
  }
  
  var barOptions = {
    show: true,
    stacked: true,
    horizontal: true,
    barWidth: 0.9,
    lineWidth: 1,
    shadowSize: 0,
    fillOpacity: 1
  };

  var graph = Flotr.draw(container, [{
    data: d1,
    bars: barOptions
  }, {
    data: d2,
    bars: barOptions
  }, {
    data: l1,
    markers: {
      show: true,
      horizontal: true,
      position: 'ml',
      labelFormatter: function(obj) {
        return d1[obj.index][0];
      }
    }
  }], properties);
}