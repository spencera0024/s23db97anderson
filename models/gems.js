const mongoose = require("mongoose")
const gemSchema = mongoose.Schema ({
    name: String,
    color: String,
    hardness: Number
})

module.exports = mongoose.model("Gem", gemSchema)