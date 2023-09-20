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
	//console.log(url)
	const hostname = host + 'download/'
	const data = {'path':url}
	const json = JSON.stringify(data)
	const content = {
		headers:{
			'content-type':'application/json'
		},
		body : json,
		method : 'POST'
	}
	//const response = await fetch(url)
	const response = await fetch(hostname,content)
	const file = await response.blob()
	const dlink = window.URL.createObjectURL(file)
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
	const testbtn = document.getElementById('test-btn')
	const testMode = testbtn.classList.contains('hide')
	const ajaxconvert = (arr)=>{
		const uintArr = new Uint8Array(arr)
		const sArr = Array.from(uintArr)
		// If order starts with 0. clear directory will activate
		const data = {'file':sArr,'name':filename,
					'address':address,'id':id,
					'order':order,'test':testMode}
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
		mode['tb-announce']=(t)=>{
			ancInit(t)
		}
		mode['tb-member']=(t)=>{
			memInit(t)
		}
		mode['tb-manual']=(t)=>{
			mnlInit(t)
		}
		mode['tb-business']=(t)=>{
			busInit(t)
		}
		mode['tb-test']=async(t)=>{
			const main = document.getElementById('main-display')
			const currPage = main.querySelectorAll('.function-area')
			let testPage
			if(currPage.length){
				testPage = currPage[0].id + '-test'
			}else{
				console.log('select a page first')
				return
			}
			//const mail = await Postman('announcebk')
			const mail = await Postman(testPage)
			const updateDiv = document.getElementById('main-display')
	
			const output = new Promise((resolve)=>{
				updateDiv.innerHTML = mail
				mode['tb-' + currPage[0].id](true)
				resolve(true)
			})
			return output
		}
		try{
			mode[code](false)
		}catch(err){
			console.log('You should build page:' + code)
		}		
	}
	document.getElementById('toolbar').addEventListener('click',(event)=>{
		const isToolbar = clsCheck(event,'tb-option')
		if(isToolbar){
			const id = event.target.id
			main(id)
			const title = document.querySelector('title')
			const isTest = id == 'tb-test'
			if(isTest){
				title.innerHTML = '測試頁面'
				title.classList.add('test-on')
			}else{
				title.innerHTML = '總務組首頁'
				title.classList.remove('test-on')
			}
		}
	})
}
const init = ()=>{
	tbfunc()
}
init()