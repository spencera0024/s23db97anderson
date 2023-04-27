const mongoose = require("mongoose")
const gemSchema = mongoose.Schema ({
    name: String,
    color: String,
    hardness: {
        type: Number,
        min: 0,
        max: 10
    }
})

module.exports = mongoose.model("Gem", gemSchema)