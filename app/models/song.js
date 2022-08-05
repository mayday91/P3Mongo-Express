// SONG -> have an owner, that is a user
// might add in subdocuments

const mongoose = require('mongoose')


const { Schema, model } = mongoose

const songSchema = new Schema(
    {
        name: {
            type: String,
            required: true
        },
        artist: {
            type: String
        },
        image: {
            type: String
        },
        mbid: {
            type: String
        },
        owner: {
			type: Schema.Types.ObjectId,
			ref: 'User'
		}
    }, {
        timestamps: true,
        // we're going to be adding virtuals to our model, the following lines will make sure that those virtuals are included whenever we return JSON or an Object
        toObject: { virtuals: true },
        toJSON: { virtuals: true }
    }
)

module.exports = songSchema

// // virtuals go here
// // these are virtual properties, that use existing data(saved in the database), to add a property whenever we retieve a document and convert it to JSON or an object.
// petSchema.virtual('fullTitle').get(function () {
//     // in here, we can do whatever javascripty things we want, to make sure we return some value that will be assigned to this virtual
//     // fullTitle is going to combine the name and type to build a title
//     return `${this.name} the ${this.type}`
// })

// petSchema.virtual('isABaby').get(function () {
//     if (this.age < 5) {
//         return "yeah, they're just a baby"
//     } else if (this.age >= 5 && this.age < 10) {
//         return "not really a baby, but still a baby"
//     } else {
//         return "a good old pet(definitely still a baby)"
//     }
// })

// module.exports = model('Pet', petSchema)