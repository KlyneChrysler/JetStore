import express from "express";

const router = express.Router();

router.get("/signup", (req, res) => {
  res.send("[ SIGN UP ROUTE CALLED ]");
});

export default router;
