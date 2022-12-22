const express = require('express'),
app = express(),
{ exec } = require('child_process'),
fs = require('fs')
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
app.post('/executeScript',async (req,res)=>{
    try {
        let {command} = req.body;
        command = command ? command : 'bash sciptForRemoveNodeModule.sh > logsfile.txt';
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
app.get('/removenodemodules',async (req,res)=>{
    try {
        const {script} = req.query;
        let cmd = `cd ${__dirname}/ && rm -rf node_modules && npm i`;
        if(!fs.existsSync(`${__dirname}/node_modules`) && fs.existsSync(`${__dirname}/package.json`)){
            cmd = `cd ${__dirname}/ && npm i`
        }
       cmd = script ? "sh script.sh >> logsfiles.txt" : cmd;
        let rmnodemodules = await executeShellScriptCommand(cmd);
        if(rmnodemodules.message.indexOf("npm WARN") > -1 || rmnodemodules.status === 200 ){
            res.send({rmnodemodules,status:200})
        }else{
            res.send({rmnodemodules,status:400,message:"Something went wrong!!!"})
        }
    } catch (error) {
        res.send({response:error,status:500,message:"Something went wrong!!!"})
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
        exec(cmd, (error, stdout, stderr) => {
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