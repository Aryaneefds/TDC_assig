import dotenv from "dotenv";
import { connectDB } from "./config/db";

import Client from "./models/Client";

dotenv.config();

const seed = async () => {
  await connectDB();

  await Client.create({
    firstName: "Aryan",
    lastName: "Yadav",

    gender: "Male",

    dob: new Date("2004-01-01"),

    city: "Bhopal",

    country: "India",

    email: "aryan@test.com",

    phone: "1234567890",

    height: 175,

    income: 1200000,

    college: "LNCT",

    degree: "B.Tech",

    company: "Google",

    designation: "SDE",

    maritalStatus: "Single",


    siblings: 1,

    religion: "Hindu",

    caste: "Yadav",

    wantKids: "Yes",

    relocate: "Yes",

    pets: "Maybe",

    statusTag:"New",

    motherTongue: "Hindi",

    familyType: "Joint",

    familyValues: "Moderate",

    dietaryPreference: "Non-Vegetarian",

    drinkingHabits: "Never",

    smokingHabits: "Never",

    hobbies: ["Programming"],

    languagesKnown: ["English","Hindi"],


    notes: ["great fit"],
  });

  console.log("Customer Added");

  process.exit();
};

seed();