/**
 * This file is to test twitter api integration
 */
var expect = require("chai").expect;
var request = require("request");

//Added by PriyaGupta
it("Successfully tested to Search API", function () {
  request("http://localhost:5000/search", function (error, response, body) {
    //console.log(response.statusCode);
    expect(response.statusCode).to.equal(200);
    expect(response.body).not.null;
    //console.log("response : "+response);
  });
});

//Added by Piyush
it("Successfully tested to Tweet API", function () {
  request("http://localhost:5000/tweet", function (error, response, body) {
    //console.log(response.statusCode);
    expect(response.statusCode).to.equal(200);
    expect(response.body).not.null;
    //console.log("response : "+response);
  });
});

//Created by HarshPatel
it("Successfully tested to Delete Tweet API", function () {
  request("http://localhost:5000/delete", function (error, response, body) {
    //console.log(response.statusCode);
    expect(response.statusCode).to.equal(200);
    expect(response.body).not.null;
    //console.log("response : "+response);
  });
});
