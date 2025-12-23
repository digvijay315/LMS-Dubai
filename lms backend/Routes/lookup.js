const express = require("express");
const { saveLookup, getLookup, remove_lookup } = require("../Controllers/Lookup-Table/lookup_table");


const router = express.Router();

router.post("/SaveLookup", saveLookup);

router.get("/LookupList", getLookup);

router.delete("/RemoveLookup", remove_lookup);

module.exports = router;
