require("dotenv").config();
const mongoose = require("mongoose");
const User = require("./../models/User.js");

const seedUsers = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("connected to DB successfully");

        await User.deleteMany();


        const users = [
            {
        username: "globalAdmin",
        email: "global@jaudi.com",
        password: "123456",
        role: "global-admin",
        region: null
      },
      {
        username: "regionalAdmin",
        email: "regional@jaudi.com",
        password: "123456",
        role: "regional-admin",
        region: "MENA"
      },
      {
        username: "senderPartner",
        email: "sender@jaudi.com",
        password: "123456",
        role: "partner-sender",
        region: "EU"
      },
      {
        username: "receiverPartner",
        email: "reciever@jaudi.com",
        password: "123456",
        role: "partner-receiver",
        region: "NA"
      }
        ];

        for (const user of users) {
            const newUser = new User(user);
            await newUser.save();
        }
        console.log("users seeded successfully")

        process.exit();

    } catch(err) {
        console.error("seeding faile: ", err.message ? err.message : err );
        process.exit(1);

    }
};

seedUsers();