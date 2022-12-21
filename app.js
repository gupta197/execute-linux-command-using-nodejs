const express = require('express'),
app = express(),
{ exec } = require('child_process'),
PORT = process.env.PORT || 3000;
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.get('/',(req,res)=>{
    res.send("Welcome to Page!")
 })

app.get('/execute',async (req,res)=>{
    try {
        const {command} = req.body;
        let response = await executeCommand(command);

        res.status(response.status).send({
            status:response.status,
            message:response.message,
            response:response
        })
    } catch (error) {
        res.status(500).send({
            status:500,
            message:error.message,
            response:error
        })
    }
})
app.get('/executeScript',async (req,res)=>{
    try {
        const {command} = req.body;
        await executeShellScriptCommand(command);
        let response = await readFile(command);
        res.status(response.status).send({
            status:response.status,
            message:response.message,
            response:response
        })
    } catch (error) {
        res.status(500).send({
            status:500,
            message:error.message,
            response:error
        })
    }
})
app.get('**',(req,res)=>{
    res.send("Page Not Found!")
})
const executeCommand = (cmd)=>{
    return new Promise(function(resolve, reject) {
        exec('ls -lh', (error, stdout, stderr) => {
            if (error) {
              console.error(`error: ${error.message}`);
            }
            resolve({
                response: stdout ? stdout : stderr,
                message: stdout ? "Success" : `stderr ${stderr}`,
                status: stdout ? 200 : 400
            })

          });
        });
}
const executeShellScriptCommand = (cmd)=>{
    return new Promise(function(resolve, reject) {
        exec('bash sciptForRemoveNodeModule.sh > logsfile.txt', (error, stdout, stderr) => {
            if (error) {
              console.error(`error: ${error.message}`);
            }
            resolve({
                response: stdout ? stdout : stderr,
                message: stdout ? "Success" : `stderr ${stderr}`,
                status: stdout ? 200 : 400
            })

          });
        });
}
const readFile = (cmd)=>{
    // Include fs module
    var fs = require('fs');
    return new Promise((resolve, reject) => {
        // Use fs.readFile() method to read the file
        fs.readFile('logsfile.txt', 'utf8', (err, data) => {
            resolve({status:data ? 200 : 400, message: data ? "Success" : err.message , response: data ? data: err})
        })
    })
}
app.listen(PORT,()=>console.log(`App is listean on http://localhost:${PORT}/`))