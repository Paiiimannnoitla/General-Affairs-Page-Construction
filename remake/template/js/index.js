const host = 'http://10.6.11.17:3000/'
const Postman = (id,func='page') =>{
	const mode = func + '/'
	const hostname = host + mode + id
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
	const hostname = host + 'post/' + address
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
const upload = async(data) =>{
	const hostname = host + 'upload/'
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
				resolve(res.text())
			})
		})
		return output
	}
	const reply = response()
	return reply
}
const download = async(url,name)=>{
	const response = await fetch(url)
	const data = await response.blob()
	const dlink = window.URL.createObjectURL(data)
	const e = document.createElement('a')
	e.href = dlink
	e.download = name
	document.body.appendChild(e)
	e.click()
	e.remove()
}
const pack = async(e,address,id,order) =>{
	const f = e[0]
	const filename = f['name']
	const fileLoader = (f)=>{
		const output = new Promise((resolve)=>{
			const reader = new FileReader()
			reader.addEventListener('load',()=>{
				resolve(reader.result)
			})
			reader.readAsArrayBuffer(f)
		})
		return output
	}
	const ajaxconvert = (arr)=>{
		const uintArr = new Uint8Array(arr)
		const sArr = Array.from(uintArr)
		const data = {'file':sArr,'name':filename,'address':address,'id':id,'order':order}
		const json = JSON.stringify(data)
		return json
	}
	const arrayBuffer = await fileLoader(f)
	const response = await ajaxconvert(arrayBuffer)
	return response
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
		mode['tb-test']=async()=>{
			const main = document.getElementById('main-display')
			const currPage = main.querySelectorAll('.function-area')
			let testPage
			if(currPage.length){
				testPage = currPage[0].id + '-test'
			}else{
				console.log('select a page first')
			}
			//const mail = await Postman('announcebk')
			const mail = await Postman(testPage)
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
			main(id)
		}
	})
}
const init = ()=>{
	tbfunc()
}
init()