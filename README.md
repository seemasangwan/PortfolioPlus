"# PortfolioPlus" 
# DynamicPortfolio

DynamicPortfolio is a personal portfolio website that allows users to dynamically manage and showcase their projects, skills, certificates, and professional experiences. This project is built using Node.js, Express.js, MongoDB, and Handlebars.js.

## Features

- User authentication (login/logout)
- Add, view, and delete projects
- Categorize and display skills
- Manage certificates
- Add professional experiences

## Technologies Used

- **Backend:** Node.js, Express.js
- **Frontend:** Handlebars.js, HTML, CSS, JavaScript
- **Database:** MongoDB with Mongoose
- **Additional Libraries:** bcrypt.js (password hashing), express-session (session management), dotenv (environment variables)

## Prerequisites

- Node.js and npm installed
- MongoDB installed and running

## Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/yourusername/DynamicPortfolio.git
   cd DynamicPortfolio

## Install dependencies:

# bash
Copy code
npm install
Set up environment variables:

Create a .env file in the root directory
Add the following variables:
## plaintext
Copy code
PORT=3000
MONGODB_URI=your_mongodb_connection_string
SECRET_KEY=your_secret_key
## Configure MongoDB:

Ensure MongoDB is running locally or provide a connection string to a MongoDB Atlas instance.

## Usage
Start the server:

bash
Copy code
npm start


## Access the application:

Open your browser and go to http://localhost:3000

## Project Structure
public/: Static files (CSS, images)
src/: Server-side code
templates/: Handlebars templates
views/: Main views
partials/: Partial views

## Routes
/: Homepage
/add: Add new items (projects, skills, certificates, experiences)
/delete: Delete items
/project: View projects
/skill: View skills
/certificate: View certificates
/experience: View experiences
/login: Login
/logout: Logout

## Adding Data
Projects:

Add projects through the /add route and fill out the form for projects.
Skills:

Add skills through the /add route and fill out the form for skills.
Certificates:

Add certificates through the /add route and fill out the form for certificates.
Experiences:

Add experiences through the /add route and fill out the form for experiences.
## Authentication
Login:
Access the login page at /login.
Use the hardcoded credentials in the DB/confi.js file.

## Contributing
Fork the repository
Create a new branch (git checkout -b feature-branch)
Commit your changes (git commit -m 'Add new feature')
Push to the branch (git push origin feature-branch)
Open a pull request
License
This project is licensed under the MIT License.

## .env Example
Provide an example .env file for users to reference:

plaintext
Copy code
PORT=3000
MONGODB_URI=mongodb://localhost:27017/dynamicportfolio
SECRET_KEY=mysecretkey

