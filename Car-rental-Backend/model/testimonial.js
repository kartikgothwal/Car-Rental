const mongoose = require("mongoose");
const { Schema } = mongoose;
const TestimonialSchema = new Schema({
  fullname: {
    type: String,
    required: true,
    match: [
      /^[a-zA-Z]+ [a-zA-Z]+(?: [a-zA-Z'-]+)*$/,
      "Please enter a valid full name",
    ],
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    validate: {
      validator: (value) => {
        return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value);
      },
      message: "Please enter a valid email address",
    },
  },
  message: {
    type: String,
    required: true,
    minLength: 220,
    maxLength: 320,
  },
});

const Testimonial = mongoose.model("testimonial", TestimonialSchema);
exports.Testimonial = Testimonial;
