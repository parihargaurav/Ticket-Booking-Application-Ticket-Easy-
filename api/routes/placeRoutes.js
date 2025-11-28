const express = require("express");
const router = express.Router();
const placeController = require("../controllers/placeController");
const authMiddleware = require("../middleware/authMiddleware");

router.post("/", authMiddleware, placeController.createPlace);
router.get("/user-places", authMiddleware, placeController.getUserPlaces);
router.get("/:id", placeController.getPlaceById);
router.put("/", authMiddleware, placeController.updatePlace);
router.get("/", placeController.getAllPlaces);

module.exports = router;
