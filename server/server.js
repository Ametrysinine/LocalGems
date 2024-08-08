import express from "express";
import cors from "cors";
import morgan from "morgan";

// import record from "./routes/record.js";
import gems from "./routes/gems.js";
import explore from "./routes/explore.js";
import landing_page from "./routes/landing_page.js";
import login from "./routes/login.js";
import sign_up from "./routes/sign-up.js";
import user_verify from "./routes/user_verify.js";
import currency from "./routes/currency.js";
import user from "./routes/user.js";
import votes from "./routes/votes.js";


const PORT = process.env.PORT || 5050;
const app = express();
 
app.use(cors());                                  // enable cross origin resourrce sharing across all express routes
app.use(express.json());                          // for parsing incoming json requests
app.use(express.urlencoded({ extended: true }));  // for parsing incoming req hhtp data with URL-encoded payloads, allows objects and arrays.
app.use(morgan('dev'));                           // Setup morgan to log http data for express, setup in dev mode

// ----------- Express router to corresponding pages in the /routes folder ----------- 
// app.use("/record", record);
// app.use("/mongoDB_record", record);
app.use("/gems", gems);
app.use("/explore", explore);
app.use("/landing-page", landing_page);
app.use("/login", login);
app.use("/sign-up", sign_up);
app.use("/api/user-verify", user_verify);
app.use("/api/user", user);
app.use("/currency", currency);
app.use("/votes", votes)


// start the Express server
app.listen(PORT, () => {
  console.log(`Express server now listening on port ${PORT}`);
});