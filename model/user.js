var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcryptjs');


var UserSchema = new Schema({
    name: {
        type: String,
        required: true,
        minlength: 4
    },
    email: {
        type: String,
        trim: true,
        unique: true,
        lowercase: true,
    },
    password: {
        type: String,
        required: true,
        minlength: 4
            //maxlength: 10
    },
    gender: {
        type: String,
        required: false,
        minlength: 1,
        maxlength: 1
    },
    facebookid: {
        type: String,
        required: false
    },
    devices: [{
        platform: {
            type: String,
            required: false
        },
        pushtoken: {
            type: String,
            required: false
        }
    }],
    birth: {
        type: Date
    },
    eventos_favorito : [{ type: Schema.Types.ObjectId, ref: 'Evento' }]
}, { timestamps: true, collection: 'users' });

UserSchema.pre('save', function (next) {
    var user = this;
    if (this.isModified('password') || this.isNew) {
        bcrypt.genSalt(10, function (err, salt) {
            if (err) {
                return next(err);
            }
            bcrypt.hash(user.password, salt, function (err, hash) {
                if (err) {
                    return next(err);
                }
                user.password = hash;
                next();
            });
        });
    } else {
        return next();
    }
});

UserSchema.methods.comparePassword = function (passw, cb) {
    bcrypt.compare(passw, this.password, function (err, isMatch) {
        if (err) {
            return cb(err);
        }
        cb(null, isMatch);
    });
};

module.exports = mongoose.model('User', UserSchema);