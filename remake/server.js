
const fs = require('fs')
const express = require('express')
const app = express()
const cors = require('cors')
app.use(express.json())
app.use(cors())
app.set('port',process.env.PORT || 3000)
const render = (name,data) =>{
	let html = fs.readFileSync(name,'utf8')
	for(var i in data){
		html = html.replaceAll('{' + i + '}', data[i])
	}
	return html
}
/*
app.get('/',(req,res)=>{
	const path = __dirname + "\\download\\111災害防救演練調查表(陳核).pdf"
	const isExist = fs.existsSync(path)
	if(isExist){
		console.log('downloading')
		res.download(path,'data.pdf')
	}else{
		console.log('no file')
	}
})*/
/*
app.post('/',(req,res)=>{
	console.log('post')
	console.log(req.body)
	res.send('apple')
	res.end()
})*/
/*
app.post('/',(req,res)=>{
	const path = __dirname + "\\download\\111災害防救演練調查表(陳核).pdf"
	const isExist = fs.existsSync(path)
	if(isExist){
		console.log('downloading')
		res.download(path,'data.pdf')
	}else{
		console.log('no file')
	}
})
app.get('/',(req,res)=>{
	const page = 'testpage.html'
	res.render(page,{
		name:'apple'
	},(err,html)=>{
		res.send(html)
	})
})
app.use((req,res)=>{
	res.type('text/plain')
	res.status(404)
	res.send('This is a 404 Situation')
})
const server = app.listen(app.get('port'),()=>{
	console.log('running')
})
*/

app.get('/', function (req, res) {
  res.send(render('./template/testpage.html', {name:100}))
})

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})