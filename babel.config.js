module.exports = function (api) {
    api.cache(true);  
    return {
      presets:["@babel/preset-react", "@babel/preset-env",],
      plugins: [
        "@babel/plugin-transform-runtime","@babel/plugin-syntax-jsx"
      ]
    };
  }
  
