module.exports = {
  //specify development server
  devServer: {
    proxy: {
      //proxy everything ending with /api
      /**urlye baxir, eger api sozu varsa, api-dan evvel gelen seyleri secib, targetle deyisir. ^ bu isare ile apidan evvelkileri secirik*/
      '^/api': {
        //before - http://localhost:8080/api/v1/categories
        //after -  http://localhost:3001/api/v1/categories
        target: 'http://localhost:3001',
        //websocket
        ws: true,
        //this happening in localhost and localhost isnot secure
        secure: false
      }
    }
  }
}