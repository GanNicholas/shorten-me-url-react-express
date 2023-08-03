const dbConnect = require("../database/database.js");
const { v4: uuidv4 } = require("uuid");
const ErrorEntity = require("../error/errorEntity.js");

async function processUrl(reqBody) {
  let ipAddr = reqBody.ip;
  let fullUrl = reqBody.fullUrl;
  fullUrl = fullUrl.toLowerCase();
  let toAppendAtFront = "https://www.";
  if (fullUrl.includes("https://")) {
    fullUrl = fullUrl.replace("https://", "");
  }

  if (fullUrl.includes("www")) {
    fullUrl = fullUrl.replace("www", "");
  }

  fullUrl = toAppendAtFront.concat(fullUrl);
  const urlToSave = {
    ipAddress: ipAddr,
    fullUrl: fullUrl,
    shortenUrl: reqBody.shortenUrl,
    keyword: "",
  };
  
  const updatedUrlToSaveObj = getNewShortUrl(urlToSave);

  console.log("Check url: " + fullUrl + "   newShortenUrl: " + updatedUrlToSaveObj.shortenUrl);

 

  const dbRes = await saveurl(updatedUrlToSaveObj);
  // console.log("DB Result: {}", dbRes);

  return updatedUrlToSaveObj.shortenUrl;
}

function saveurl(urlToSave) {
  const saveUrlQuery = `INSERT INTO urltable (ipAddress,fullUrl, shortenUrl, keyword) VALUES (?,?,?,?)`;

  return new Promise((resolve, reject) => {
    dbConnect.query(
      saveUrlQuery,
      [
        urlToSave.ipAddress,
        urlToSave.fullUrl,
        urlToSave.shortenUrl,
        urlToSave.keyword,
      ],
      function (err, result, data) {
        if (err) {
          throw new (ErrorEntity.internalServerError(
            "Error saving request."
          ))();
        }

        resolve(result);
      }
    );
  });
}

function getNewShortUrl(shortenUrlObj) {
  const shortenUrlBody = uuidv4().toString().replace("-", "").substring(0, 8);
  shortenUrlObj.keyword = shortenUrlBody;
  shortenUrlObj.shortenUrl = shortenUrlObj.shortenUrl.concat(shortenUrlBody);
  return shortenUrlObj;
}

module.exports = { processUrl };
