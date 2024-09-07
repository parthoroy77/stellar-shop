import colors from "colors";
import config from "../config";
import { ApiError } from "../handlers/ApiError";

// Function to ping the server (using public domain)
const pingServer = async () => {
  try {
    // Ping your own server's public URL to prevent shutdown
    console.log("Pinging Domain:" + config.domain_url);
    const response = await fetch(`${config.domain_url}/ping`);
    if (response.statusText === "OK") {
      console.log(colors.blue.bold(`Ping Successful Server Up & Running`));
    }
  } catch (error) {
    console.log(error);
    throw new ApiError(400, "Something went wrong while pinging server");
  }
};

const randomMinutes = Math.floor(Math.random() * 3) + 12; // Random between 12 and 14
const randomInterval = randomMinutes * 60 * 1000; // Convert to milliseconds
setInterval(pingServer, randomInterval);

export default pingServer;
