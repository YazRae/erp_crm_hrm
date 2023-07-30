/*
    >Add the origins from where requests will be accepted from and not blocked by CORS.
    >Make sure they match the EXACT origins because the are strings.
    >More than one origin can be added.
*/

const allowedOrigins = ["http://localhost:3000", "http://localhost:3500"];

export default allowedOrigins;
