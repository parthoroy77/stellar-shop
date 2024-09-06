import config from "../config";
import { ApiError } from "../handlers/ApiError";

// Function to ping the server (using public domain)
const pingServer = async () => {
  try {
    // Ping your own server's public URL to prevent shutdown
    console.log("Pinging Domain:" + config.domain_url);
    const response = await fetch(`${config.domain_url}/ping`);
    console.log("Ping successful to keep server alive:", await response.text());
  } catch (error) {
    throw new ApiError(400, "Something went wrong while pinging server");
  }
};

const randomMinutes = Math.floor(Math.random() * 3) + 12; // Random between 12 and 14
const randomInterval = randomMinutes * 60 * 1000; // Convert to milliseconds
setInterval(pingServer, randomInterval);

export default pingServer;
