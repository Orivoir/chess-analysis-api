const express = require('express');
const app = express();
const server = require('http').Server(app);
const chessAnalysisApi = require('chess-analysis-api').chessAnalysisApi;

app.get('/analysis', (request, response) => {

  const {fen, multiPv, depth} = request.query;

  chessAnalysisApi.getAnalysis({
    fen,
    multipv: multiPv,
    depth
  })
  .then(result => response.json(result))
  .catch(error => {
    response.statusCode = 500;
    response.json({
      message: "internal server error",
      details: error.message || "unknown"
    });
  });

})
.get('/', (_, response) => {
  response.json({
    status: "success",
    message: "chess analysis api welcome",
    endpoint: "/analysis?fen=<FEN>&depth=<DEPTH>&multiPv=<MULTI_PV>"
  });
})

const httpListener = server.listen(process.env.PORT || 8080, () => {
  console.log(`HTTP server run at: ${httpListener.address().port}`);
});