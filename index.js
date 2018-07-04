'use strict';

var fs = require('fs');
var path = require('path');

function HtmlWebpackLayoutPlugin (options) {}

HtmlWebpackLayoutPlugin.prototype.apply = function (compiler) {
  var that = this;
  compiler.hooks.compilation.tap('html-webpack-layout-plugin', (compilation) => {
    compilation.hooks.htmlWebpackPluginBeforeHtmlProcessing.tapAsync('html-webpack-layout-plugin', (htmlPluginData, callback) => {
      htmlPluginData.html = that.addLayout( htmlPluginData.html , htmlPluginData.plugin.options);
      callback(null, htmlPluginData);
    });
  });
};


HtmlWebpackLayoutPlugin.prototype.addLayout = function ( html, options ){
  if(options.layout){
      var replace = options.replace || 'content';
      var layout = fs.readFileSync(options.layout, 'utf-8');
      var reg = new RegExp(replace);
      html = layout.replace(reg, html);
  }

  return html;
}


module.exports = HtmlWebpackLayoutPlugin;
