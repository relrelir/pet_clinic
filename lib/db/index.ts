import mongoose from "mongoose";

const { MONGODB_URI, DB_HOST, DB_USER, DB_PASS, DB_NAME } = process.env;

export const db = async () => {
  console.log("connectedDB");

  if (mongoose.connections[0].readyState) {
    // Use current db connection
    return mongoose;
  }

  // Use new db connection
  await mongoose.connect(
    MONGODB_URI || `mongodb+srv://${DB_USER}:${DB_PASS}@${DB_HOST}/${DB_NAME}`
  );

  console.log("mogoose is connected!");

  return mongoose;
};

export const dbClient = async () => (await db()).connection.getClient();

export const withMongodb = (handler) => async (req, res) => (
  await db(), handler(req, res)
);

export default withMongodb;

/**
 * client -> fetch with url: await fetch('api/initConnectionToDB')
 * server -> make api call to mongo db and connect to DB
 * server -> return data or OK message or error message
 */

/**
 * client -> server // fetch("api/patients") // endpoint
 * server -> db // User.Find() // methods of mongoose
 * db -> server
 * server -> client
 *
 */
