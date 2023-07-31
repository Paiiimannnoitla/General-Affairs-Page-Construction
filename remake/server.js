
const fs = require('fs')
const express = require('express')
const app = express()
const cors = require('cors')
app.use(express.json())
app.use(cors())
app.set('port',process.env.PORT || 3000)
app.use(express.static(__dirname + '/template' ))
console.log(__dirname)
const render = (name,data=false) =>{
	let html = fs.readFileSync('./template/' + name + '.html','utf8')
	if(data){
		for(var i in data){
			html = html.replaceAll('{' + i + '}', data[i])
		}
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
*/
/*
app.use((req,res)=>{
	res.type('text/plain')
	res.status(404)
	res.send(render('404'))
})*/

app.get('/download/:num',(req,res)=>{
	console.log(req.params.num)
	const path = __dirname + "\\download\\111災害防救演練調查表(陳核).pdf"
	const isExist = fs.existsSync(path)
	if(isExist){
		console.log('downloading')
		console.log(path)
		res.download(path,'data.pdf')
	}else{
		console.log('no file')
	}
})
app.get('/',(req,res)=>{
	res.send(render('index'))
})
app.get('/member',(req,res)=>{
	res.send(render('member'))
})
app.post('/test', (req, res)=>{
  //res.write({apple:'apple'})
  res.send(render('testpage', {name:100}))
})

app.listen(3000, function () {
  console.log('---Server Start---')
})