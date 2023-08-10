const Postman = (id,func='page') =>{
	const mode = func + '/'
	const hostname = 'http://10.6.11.17:3000/' + mode + id
	const content = {
		//body:data,
		headers:{
			'content-type':'application/json'
		},
		method:'GET'
	}
	const response = ()=>{
		const output = new Promise((resolve)=>{
			fetch(hostname,content).then((res)=>{
				if(func=='page'){
					resolve(res.text())
				}else{
					resolve(res.json())
				}
				//resolve(res.text())
			})
		})
		return output
	}
	const reply = response()
	return reply
}
const Delivery = (address) =>{
	const main = document.getElementById('main-display')
	const html = {'html':main.innerHTML}
	const data = JSON.stringify(html)
	const hostname = 'http://10.6.11.17:3000/post/' + address
	const content = {
		headers:{
			'content-type':'application/json'
		},
		body : data,
		method:'POST'
	}
	const response = ()=>{
		const output = new Promise((resolve)=>{
			fetch(hostname,content).then((res)=>{
				resolve(res)
			})
		})
		return output
	}
	const reply = response()
	return reply
}
const Render = async(e)=>{
	const mail = await Postman(e)
	const updateDiv = document.getElementById('main-display')
	const output = new Promise((resolve)=>{
		updateDiv.innerHTML = mail
		resolve(true)		
	})
	return output
}
const tbfunc = ()=>{	
	const mode = []
	const main = (code)=>{
		mode['tb-announce']=()=>{
			ancInit()
		}
		mode['tb-member']=()=>{
			memInit()
		}
		mode['test']=async()=>{
			const mail = await Postman('announcebk')
			const updateDiv = document.getElementById('main-display')
	
			const output = new Promise((resolve)=>{
				updateDiv.innerHTML = mail
				resolve(true)
			})
			return output
		}
		try{
			mode[code]()
		}catch(err){
			console.log('You should build page:' + code)
		}		
	}
	document.getElementById('toolbar').addEventListener('click',(event)=>{
		const isToolbar = clsCheck(event,'tb-option')
		if(isToolbar){
			const id = event.target.id
			//Delivery('member')
			main(id)
			//request()
			//Delivery(1000)
		}
	})
}
const init = ()=>{
	tbfunc()
}
init()