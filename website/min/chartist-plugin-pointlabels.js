(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module.
    define([], function () {
      return (root.returnExportsGlobal = factory());
    });
  } else if (typeof exports === 'object') {
    // Node. Does not work with strict CommonJS, but
    // only CommonJS-like enviroments that support module.exports,
    // like Node.
    module.exports = factory();
  } else {
    root['Chartist.plugins.ctPointLabels'] = factory();
  }
}(this, function () {

  /**
   * Chartist.js plugin to display a data label on top of the points in a line chart.
   *
   */
  /* global Chartist */
  (function(window, document, Chartist) {
    'use strict';

    var defaultOptions = {
      labelClass: 'ct-label',
      labelOffset: {
        x: 0,
        y: -10
      },
      textAnchor: 'middle',
      labelInterpolationFnc: Chartist.noop
    };

    Chartist.plugins = Chartist.plugins || {};
    Chartist.plugins.ctPointLabels = function(options) {

      options = Chartist.extend({}, defaultOptions, options);

      return function ctPointLabels(chart) {
        if(chart instanceof Chartist.Line) {
          chart.on('draw', function(data) {
              // CHANGED: labels on series sized less than 10
            if(data.type === 'point' && data.series !== undefined && data.series.length < 10) {
                console.log(data);
              data.group.elem('text', {
                x: data.x + options.labelOffset.x,
                y: data.y + options.labelOffset.y,
                style: `text-anchor: ${options.textAnchor}; font-size: 15px; fill: #000000`,
                // CHANGED: below
            }, options.labelClass).text(options.labelInterpolationFnc(data.value.x));
              // }, options.labelClass).text(options.labelInterpolationFnc(data.value.x === undefined ? data.value.y : data.value.x + ', ' + data.value.y));
            }
          });
        }
      };
    };

  }(window, document, Chartist));
  return Chartist.plugins.ctPointLabels;

}));