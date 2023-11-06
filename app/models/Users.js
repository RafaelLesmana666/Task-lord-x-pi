const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Schema = mongoose.Schema;
const SALT_WORK_FACTOR = 10;

const UsersSchema = new Schema({
    username:{
        type:String,
        required:true,
        unique: true
    },
    password:{
        type:String,
        required:true
    },
    role:{
        type:String,
        required:true,
        enum: ['staffAdministrasi','staffTicketing','staffPemasaran','staffKeuangan']
    },
    token:{
        type:String 
    }
},{timestamps: true});

UsersSchema.pre('save', function(next){
    var user = this;

    // hash password yang baru atau udah di update
    if(!user.isModified('password')){
        return next();
    }

    //generate salt
    bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt){
        if(err){
            return next(err);
        }

        //hash password dengan salt
        bcrypt.hash(user.password, salt, function(err, hash){
            if(err){
                return next(err);
            }

            //hash password
            user.password = hash;
            next();
        });
    });
});

UsersSchema.methods.comparePassword = function(candidatePassword, cb) {
    bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
        if (err) return cb(err);
        cb(null, isMatch);
    });
};

const Users = mongoose.model('Users',UsersSchema);
module.exports = Users;