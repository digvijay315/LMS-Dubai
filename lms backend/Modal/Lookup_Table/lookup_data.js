const mongoose = require("mongoose");
// it is a admin_lookups schema also known as zatra lookup model
const lookup_schema = new mongoose.Schema(
  {
    lookup_type: {
      type: String,
    },
    lookup_value: {
      type: String,
    },

    parent_lookup_value: {
      type: String
    },

    is_active: {
      type: Boolean,
      default: true,
    },

    other: {
      type: Object,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("admin_lookups", lookup_schema);
