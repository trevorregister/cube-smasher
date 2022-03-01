const mongoose = require('mongoose')
const Schema = mongoose.Schema
const jwt = require('jsonwebtoken')

const UserSchema = new Schema({
    firstName: {
        type: String,
        required: [true, 'firstName required'],
    },

    lastName:{
        type:String,
        required:[true, 'lastName required']
    },

    email:{
        type:String,
        required:[true, 'email required'],
    },

    rentals: Array,

    accountStatus:{
        type:String,
        required:[true, 'accountStatus required'],
        enum: {
            values: ['active', 'suspended'],
            message: [`accountStatus must be 'active' or 'suspended`]
        }
    },

    role:{
        type:String,
        required:[true, 'Role required'],
        enum: {
            values: ['customer', 'admin', 'superAdmin'],
            message: `role must be 'customer', 'admin', or superAdmin`
        }
    },

    hash: {
        type: String,
        required: [true, 'Password required']
    },

    token: String,

    createdAt: Date,

    updatedAt: Date
})

UserSchema.methods.generateAuthToken = function() {
    const token = jwt.sign({_id:this._id, role:this.role}, process.env.JWT_SECRET)
    return token
}


var User = mongoose.model('User', UserSchema)

module.exports = User



