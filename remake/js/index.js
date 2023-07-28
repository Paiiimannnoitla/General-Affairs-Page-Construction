const Postman = (fashion,data) =>{
	const hostname = 'http://10.6.11.17:3000'
	const content = {
		body:data,
		headers:{
			'content-type':'application/json'
		},
		method:fashion
	}
	const response = ()=>{
		const output = new Promise((resolve)=>{
			fetch(hostname,content).then((res)=>{
				resolve(res.text())
			})
		})
		return output
	}
	const reply = response()
	return reply
}
const request = async()=>{
		const apple = {apple:100}
		const json = JSON.stringify(apple)
		const mail = await Postman('POST',json)
		console.log(mail)
}
const tbfunc = ()=>{
	const mode = []
	const main = (code)=>{
		mode['tb-member']=()=>{
			
		}
		mode[code]()
	}
	document.getElementById('toolbar').addEventListener('click',(event)=>{
		const isToolbar = clsCheck(event,'tb-option')
		if(isToolbar){
			const id = event.target.id
			//main(id)
			request()
		}
	})
}
const init = ()=>{
	tbfunc()
}
init()