const express = require("express");
const router = express.Router();
const validator = require("express-validator");
const { check, body, validationResult } = validator;
const urlService = require("../service/urlService.js");
const ErrorEntity = require("../error/errorEntity.js");

const processShortenJSON = (req, res, next) => {
  //   const urlReq = JSON.parse(req.body);
  const urlReq = req.body;
  console.log(urlReq);
  req.body = urlReq;
  next();
};

router.post(
  "/shortenme",
  processShortenJSON,
  [body("fullUrl").not().isEmpty().withMessage("Please enter a valid url.")],
  async (req, res, next) => {
    const ip = req.headers["x-forwarded-for"] || req.socket.remoteAddress;
    const fullUrl = req.body.fullUrl;
    req.body.ip = ip;

    if (fullUrl == undefined || fullUrl == "" || ((fullUrl.split(".").length - 1) < 2)) {
      next(ErrorEntity.badRequest("Your full url is an invalid url."));
    } else {
      console.log("Full URL: " + fullUrl + " from IP: " + ip);
      const shortenUrl = await urlService.processUrl(req.body);
      const resBody = {
        shortenUrl: shortenUrl
      }
      res.status(200).send(resBody);
    }
  }
);

module.exports = router;
