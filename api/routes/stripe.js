const router = require("express").Router();
const stripe = require("stripe")("sk_test_51LIIwQF490DhVBLAnvZQ2mttPtLZcTLlZcVMiDcVuPikrMcbpzmZ1GfGmixBcwbOCq1UGqutLfw4a3bE2cZYWiig00mmLpdfdd");

router.post("/payment", (req, res) => {
  stripe.charges.create(
    {
      source: req.body.tokenId,
      amount: req.body.amount,
      currency: "usd",
    },
    (stripeErr, stripeRes) => {
      if (stripeErr) {
        console.log('error ==>', stripeErr)
        res.status(500).json(stripeErr);
      } else {
        res.status(200).json(stripeRes);
      }
    }
  );
});

module.exports = router;