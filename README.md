# Smart-Fridge-RPi-NodeJS

### Using NodeJS call python-shell
```
PythonShell.run('YourPythonCode.py', function (err) {
  if (err) throw err;
  console.log('finished');
});
console.log("test");
```
### How to install python-shell
```
$ npm install python-shell
```
### How to Run
```
 $ npm install
 $ node index.js

```
### Solution Ploblem Local db & mlab db
```
 1.
	- Remove or Comment 'delete req.body._id' in file Smart-Fridge-RPi-NodeJS/models/db/db.route.js
   	- server.js Should comment 'mongoose.connect'that is Local
 2.
	- Don't Remove or Comment 'delete req.body._id' in file Smart-Fridge-RPi-NodeJS/models/db/db.route.js
	- Don't server.js Should comment 'mongoose.connect'that is Local but use 'mongoose.connect' for mla
```
