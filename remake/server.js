
const fs = require('fs')
const express = require('express')
const app = express()
const cors = require('cors')
app.use(express.json({limit: '100gb'}))
//app.use(express.urlencoded({limit: '100mb'}))
app.use(cors())
app.set('port',process.env.PORT || 3000)
app.use(express.static(__dirname + '/template' ))
// Page renderer
const render = (name,data=false) =>{
	let html = fs.readFileSync('./template/' + name + '.html','utf8')
	if(data){
		for(var i in data){
			html = html.replaceAll('{' + i + '}', data[i])
		}
	}
	
	return html
}
// Scripts import

app.get('/',(req,res)=>{
	res.send(render('index'))
	
})
app.post('/load/:func',(req,res)=>{
	const func = req.params.func + '/'
	const exArr = req.body['data']
	const name = req.body['name']
	const extra = exArr.join('/')
	const page = fs.readFile('./template/load/' + func + extra + '/' + name + '.html','utf8',(err,data)=>{
		res.send(data)
	})
})
app.get('/page/:pagename',(req,res)=>{
	const pagename = req.params.pagename
	const page = fs.readFile('./template/' + pagename + '.html','utf8',(err,data)=>{
		res.send(data)
	})
})
app.post('/test', (req, res)=>{
  res.send(render('testpage', {name:100}))
})
app.post('/post/:pagename',(req,res)=>{
	const pagename = req.params.pagename
	const html = req.body['html']
	const path = req.body['path']
	if(path){
		const loadPath = './template/load/'+ pagename + '/' + path + '/'
		fs.mkdirSync(loadPath, { recursive: true })
		fs.writeFileSync(loadPath + pagename + '.html',html)
	}else{
		fs.writeFileSync('./template/' + path + '/' + pagename + '.html',html)
	}
	//fs.writeFileSync('./template/' + pagename + '.html',html)
	res.send(true)
})
app.post('/upload',async(req,res)=>{
	const test = req.body['test']
	let expath = ''
	if(test){
		expath = 'test/'
	}
	const address = req.body['address']
	const data = req.body['file']
	const string = Buffer.from(data)	
	const name = req.body['name']
	const id = req.body['id']
	const isDelete = !req.body['order']
	const path = './download/' + expath + address + '/' + id 
	if(isDelete){
		fs.rmSync(path,{ recursive:true,force:true})
	}
	
	fs.mkdirSync(path, { recursive: true })
	fs.writeFileSync(path + '/'+ name,string)	
	res.send(expath + address + '/' + id + '/' + name)
	res.end()
})
app.post('/download',(req,res)=>{
	const hostname = 'download/'
	const path = hostname + req.body['path']
	res.download(path)
})
/*
app.get('/download/:page/:id/:filename',(req,res)=>{
	const hostname = 'download/'
	const page = req.params.page
	const id = req.params.id
	const filename = req.params.filename
	const path = hostname + page + '/' + id + '/' + filename
	res.download(path)
})
app.get('/download/test/:page/:id/:filename',(req,res)=>{
	const hostname = 'download/test/'
	//console.log(filename)
	const page = req.params.page
	const id = req.params.id
	const filename = req.params.filename
	const path = hostname + page + '/' + id + '/' + filename
	res.download(path)
})*/
app.listen(3000, function () {
  console.log('---Server Start---')
})