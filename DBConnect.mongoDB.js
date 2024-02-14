import mongoose from "mongoose";

async function connectToDB(DBURI) {
  try {
    await mongoose.connect(DBURI);
    console.log("connected to Database on URI : ", DBURI);
  } catch (error) {
    console.log("error connection to Database : ", error.message);
  }
}

export { connectToDB };
