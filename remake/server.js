
const fs = require('fs')
const express = require('express')
const app = express()
const cors = require('cors')
app.use(express.json())
app.use(cors())
app.set('port',process.env.PORT || 3000)
app.use(express.static(__dirname + '/template' ))
console.log(__dirname)
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
/*
const scriptImporter = () =>{
	const scriptDir = ('./script')
	const filelist = fs.readdirSync(scriptDir)
	for(var i=0;i<filelist.length;i++){
		require(scriptDir + filelist[i])
	}
}*/
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
*/
/*
app.use((req,res)=>{
	res.type('text/plain')
	res.status(404)
	res.send(render('404'))
})*/

app.get('/load/member',(req,res)=>{
	const file = fs.readFileSync('./template/data/Member/member.json')
	//console.log(file)
	const json = JSON.parse(file)
	res.send(json)
})
app.get('/redirect',(req,res)=>{
	res.send(render('redirect'))
})
app.get('/',(req,res)=>{
	res.send(render('index'))
	
})
app.get('/page/:pagename',(req,res)=>{
	const pagename = req.params.pagename
	console.log(pagename)
	const page = fs.readFile('./template/' + pagename + '.html','utf8',(err,data)=>{
		console.log(err)
		res.send(data)
	})
})
app.post('/test', (req, res)=>{
  //res.write({apple:'apple'})
  res.send(render('testpage', {name:100}))
})
app.get('/download/:filename',(req,res)=>{
	const hostname = 'download/'
	res.download(hostname + req.params.num)
})
app.listen(3000, function () {
  console.log('---Server Start---')
})