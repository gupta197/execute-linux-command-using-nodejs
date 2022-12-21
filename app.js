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
        let response = await executeShellScriptCommand(command);

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
const executeShellScriptCommand = (cmd)=>{
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
app.listen(PORT,()=>console.log(`App is listean on http://localhost:${PORT}/`))