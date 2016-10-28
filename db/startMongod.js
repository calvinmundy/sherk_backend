var spawn = require('child_process').spawn;

//var mongod = spawn('/c/Program\ Files/MongoDB/Server/3.2/bin/mongod.exe', ['--dbpath', './data']);
var mongod = spawn('mongod.exe', ['--dbpath', './data']);

mongod.stdout.on('data', (data) => {
  console.log(data.toString());
});

mongod.stderr.on('data', (data) => {
  console.log(data.toString());
});