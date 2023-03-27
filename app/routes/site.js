import express from "express";
import { rebuild } from "../utils/gatsby";

const router = express.Router();

router.post(`/update`, (req, res) => {
  console.log(`Rebuilding Gatsby`);
  // eslint-disable-next-line no-unused-vars
  rebuild((err, obj) => {
    if (err) {
      console.log(err);
      return res.sendStatus(500);
    }
    console.log(obj);
    return res.sendStatus(200);
  });
});

module.exports = router;
