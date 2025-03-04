// build.js
const fs = require('fs');
const path = require('path');
const dotenv = require('dotenv');

// Load environment variables from .env file
dotenv.config();

// Function to replace placeholders in a file
function replacePlaceholders(filePath, envVars) {
    let content = fs.readFileSync(filePath, 'utf8');
    for (const [key, value] of Object.entries(envVars)) {
        const placeholder = `{{${key}}}`;
        content = content.replace(new RegExp(placeholder, 'g'), value);
    }
    fs.writeFileSync(filePath, content, 'utf8');
}

// Define the environment variables to inject
const envVars = {
    GOOGLE_MAPS_API_KEY: process.env.GOOGLE_MAPS_API_KEY,
    AUTH0_DOMAIN: process.env.AUTH0_DOMAIN,
    AUTH0_CLIENT_ID: process.env.AUTH0_CLIENT_ID,
    AUTH0_REDIRECT_URI: process.env.AUTH0_REDIRECT_URI
};

// Replace placeholders in HTML and JS files
replacePlaceholders(path.join(__dirname, 'index.html'), envVars);
replacePlaceholders(path.join(__dirname, 'main.html'), envVars);
replacePlaceholders(path.join(__dirname, 'index.js'), envVars);
replacePlaceholders(path.join(__dirname, 'main.js'), envVars);

console.log('Environment variables injected successfully!');