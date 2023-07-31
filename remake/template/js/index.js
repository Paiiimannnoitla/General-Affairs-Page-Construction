const Postman = (fashion,data) =>{
	//const hostname = 'http://10.6.11.17:3000/test'
	const hostname = 'http://10.6.11.17:3000/download/100'
	const content = {
		/*body:data,*/
		headers:{
			'content-type':'application/json'
		},
		method:fashion
	}
	const response = ()=>{
		const output = new Promise((resolve)=>{
			fetch(hostname,content).then((res)=>{
				//resolve(res.text())
				resolve(res)
			})
		})
		return output
	}
	const reply = response()
	window.open(hostname)
	return reply
}
const request = async()=>{
		const apple = {apple:100}
		const json = JSON.stringify(apple)
		const mail = await Postman('GET',json)
		console.log(mail.body)
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