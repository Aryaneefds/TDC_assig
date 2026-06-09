import mongoose from "mongoose";

const clientSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },

    lastName: {
      type: String,
      required: true,
    },

    gender: {
      type: String,
      enum: ["Male", "Female"],
      required: true,
    },

    dob: {
      type: Date,
      required: true,
    },

    country: String,

    city: String,

    height: Number,

    email: {
      type: String,
      unique: true,
    },

    phone: String,

    college: String,

    degree: String,

    income: Number,

    company: String,

    designation: String,

    maritalStatus: String,



    siblings: Number,

    religion: String,

    caste: String,

    wantKids: {
      type: String,
      enum: ["Yes", "No", "Maybe"],
    },

    relocate: {
      type: String,
      enum: ["Yes", "No", "Maybe"],
    },

    pets: {
      type: String,
      enum: ["Yes", "No", "Maybe"],
    },

    statusTag: {
        type: String,
        enum: [
            "New",
            "Profile Verified",
            "Active Search",
            "Match Sent",
            "Meeting Scheduled",
            "Engaged",
            "Closed"
        ],
        default: "New"
    },

    motherTongue: { 
        type: String 
    },

    familyType: { 
        type: String, enum: ['Nuclear', 'Joint', 'Extended'] 
    },

    familyValues: { 
        type: String, enum: ['Orthodox', 'Moderate', 'Liberal'] 

    },

    dietaryPreference: {
        type: String, enum: ['Vegetarian', 'Non-Vegetarian', 'Vegan', 'Jain'] 
    },

    drinkingHabits: {
        type: String, enum: ['Never', 'Occasionally', 'Regularly'] 
    },

    smokingHabits: {
         type: String, enum: ['Never', 'Occasionally', 'Regularly']
    },

    hobbies: [{ type: String }],

    languagesKnown: [{ type: String }],

    rashi: {
        type: String 
    },

    manglik: {
         type: String, enum: ['Yes', 'No', 'Anshik'] 
    },




    notes: [String],
  },
{
    timestamps: true
})

export default mongoose.model(
  "Client",
  clientSchema
);