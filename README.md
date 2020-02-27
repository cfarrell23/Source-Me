# SourceMe
The SourceMe web application displays all current open project roles for users to browse through at their discretion. Users can sort and search through many roles; find out more information about roles of interest and apply for roles that suit their skills.

## Set Up
### Prerequisites
- GIT BASH - https://git-scm.com/download/win
- ATOM - https://atom.io/
- MONGODB - https://www.mongodb.com/download-center/community - MSI package
- NODEJS - https://nodejs.org/en/download/ - LTS version (.msi)
- ROBO3T - https://robomongo.org/download - Robo3t only
- POSTMAN - https://www.postman.com/downloads/

### Internet Connection
Do not use this application on WirelessDNET: you will be unable to use the necessary APIs.

### Downloading Project
1. Open the Git Bash terminal
2. Type the command ***git clone https://github.com/cfarrell23/Source-Me.git***
3. Type the command ***cd Source-Me*** to enter the project directory
4. Type the command ***atom .*** to check that the project files are present by viewing them in the Atom IDE

### NPM installs
To run the program, you will need to install the required npm packages. Here are the steps to download them into the project
1. Open the Git Bash terminal
2. Enter the project directory (***cd Source-Me***)
3. Type the command ***npm i -g nodemon*** - nodemon restarts the server if you make any changes to the code. '-g' is the global tag meaning it applies to any project you have.
4. Type the command ***npm i dotenv express express-session ejs fs jsonfile mongoose mongoose-findorcreate mongoose-timestamp passport passport-google-oauth20 passport-local-mongoose path winston winston-daily-rotate-file xlsx*** to download all necessary packages

### Running the Project
1. Open the Git Bash terminal
2. Enter the project directory (***cd Source-Me***)
3. Type ***node app.js***. The server will be succesfully running if it says *"Server started on PORT 3000"*
4. Open Google Chrome
5. Enter the URL ***localhost:3000***

## Testing SourceMe
### Checking the Database
1. Open Robo 3T
2. Create a new connection - the default port is port 27017 but if you have changed the MongoDB port for your machine, ensure you switch to the suitable port for your version of MongoDB
3. Open the dropdown for the 'open-roles' to view the SourceMe database
4. Open the dropdown for 'Collections' to view the tables within the SourceMe database
5. To view the contents of a collection, right click on the collection and click 'View Documents'

### Running API requests
1. Ensure the SourceMe project is running (see Running the Project)
2. Open Postman
3a. Set the request url to ***localhost:3000/roles*** - this will apply requests to all roles in the SourceMe database.
3b. For requests on a specific role, set the request url to ***localhost:3000/roles/:requestNumber/:roleNumber*** and in the Params tab, set the path variables for requestNumber (e.g. 000000002) and roleNumber (e.g. 0020) to the role you wish to send requests to.

> To close the server on your Git Bash terminal, enter 'ctrl + c'
