# Execute Linux/Mac command using nodejs

Steps to Install Project;

Step 1 : clone the Project
`git clone https://github.com/gupta197/execute-linux-command-using-nodejs`

Step 2 : `cd execute-linux-command-using-nodejs`

Step 3 : Install Package

`npm install`
Step 4 : Start the Project

`node app.js`

#Routes
API 1)

Method : GET

Path: localhost:3000/removenodemodules

Optional query parameter: ?script=true

API 2) 
Method : POST
Path : localhost:3000/executeScript

Send value in body field:  command
