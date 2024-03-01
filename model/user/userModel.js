const mongoose=require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const SECRET_KEY = "vnvosioirrituriowa";

const userSchema=new mongoose.Schema({
    firstname:{
        type:String,
        requied:true,
    },
    lastname:{
        type:String,
        requied:true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        validator(value) {
          if (!validator.isEmail(value)) {
            throw new Error("not valid email");
          }
        },
      },
      userprofile:{
        type:String,
        requied:true,
      },
      password:{
        type:String,
        requied:true,
      },
      tokens: [
        {
          token: {
            type: String,
            required: true,
          },
        },
      ],
      // for forgot password
      verifytoken:{
        type:"String",
      }

},{timestamps:true});


userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 12);
  }
  next();
});

userSchema.methods.generateuserAuthToken = async function () {
  try {
    let newToken = jwt.sign({ _id: this._id }, SECRET_KEY, { expiresIn: "1d" });
    this.tokens=this.tokens.concat({token:newToken})
    await this.save();
    return newToken;
  } catch (error) {
    return res.status(404).json({ error: "invalid" });
  }
};

// usermodel
const userDB=new mongoose.model("usersDbs",userSchema);
module.exports=userDB;

