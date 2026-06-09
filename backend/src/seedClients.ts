import { faker } from "@faker-js/faker";
import dotenv from "dotenv";

import { connectDB } from "./config/db";
import Client from "./models/Client";

dotenv.config();

const religions = [
  "Hindu",
  "Muslim",
  "Sikh",
  "Christian"
];

const cities = [
  "Delhi",
  "Mumbai",
  "Bangalore",
  "Pune",
  "Hyderabad",
  "Bhopal"
];

const degrees = [
  "B.Tech",
  "MBA",
  "B.Com",
  "M.Tech",
  "MBBS"
];

const familyValues = [
  "Orthodox",
  "Moderate",
  "Liberal"
];

const maritalStatuses = [
  "Single",
  "Divorced"
];

const randomElement = (arr: string[]) =>
  arr[Math.floor(Math.random() * arr.length)];


const createClient = (
  gender: "Male" | "Female"
) => {

  const age =
    faker.number.int({
      min: 23,
      max: 35,
    });

  const currentYear =
    new Date().getFullYear();

  return {
    firstName:
      faker.person.firstName(
        gender === "Male"
          ? "male"
          : "female"
      ),

    lastName:
      faker.person.lastName(),

    gender,

    dob: new Date(
      currentYear - age,
      0,
      1
    ),

    country: "India",

    city:
      randomElement(cities),

    height:
      faker.number.int({
        min:
          gender === "Male"
            ? 165
            : 150,
        max:
          gender === "Male"
            ? 190
            : 175
      }),

    email:
      faker.internet.email(),

    phone:
      faker.phone.number(),

    degree:
      randomElement(degrees),

    income:
      faker.number.int({
        min: 300000,
        max: 3000000
      }),

    company:
      faker.company.name(),

    designation:
      faker.person.jobTitle(),

    maritalStatus:
      randomElement(
        maritalStatuses
      ),

    religion:
      randomElement(
        religions
      ),

    wantKids:
      randomElement([
        "Yes",
        "No",
        "Maybe"
      ]),

    familyValues:
      randomElement(
        familyValues
      ),

    openToRelocate:
      randomElement([
        "Yes",
        "No",
        "Maybe"
      ]),

    openToPets:
      randomElement([
        "Yes",
        "No",
        "Maybe"
      ]),

    languagesKnown: [
      "Hindi",
      "English"
    ],

    notes: []
  };
};

const seed = async () => {

  await connectDB();

  await Client.deleteMany();

  const clients = [];

  for (let i = 0; i < 50; i++) {
    clients.push(
      createClient("Male")
    );

    clients.push(
      createClient("Female")
    );
  }

  await Client.insertMany(
    clients
  );

  console.log(
    "100 Clients Inserted"
  );

  process.exit();
};

seed();