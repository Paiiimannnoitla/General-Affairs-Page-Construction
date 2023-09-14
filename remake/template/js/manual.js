
// Rendering
const mnlBuild = async(t)=>{
	if(t){
		return true
	}
	const isRendered = await Render('manual')
	if(isRendered){
		const output = new Promise((resolve)=>{
			resolve(true)
		})
		return output
	}
}

// Main: Edit Function
const mnlFunc = ()=>{
	uxLoginCheck()
	//Side: Move to specifc Area
	document.getElementById('function-menu').addEventListener('click',(event)=>{
		const e = event.target
		const isMove = e.id == 'mnl-btn-move'
		if(isMove){
			const table = document.querySelector('table')
			table.scrollTo(0,0)
			const department = e.classList[0]
			const header = document.getElementById(department)
			const placeholder = window.outerHeight - window.innerHeight
			const height = header.getBoundingClientRect().top - placeholder
			table.scrollTo(0,height)
		}
		/*
		const table = document.querySelector('table')
		table.scrollTo(0,0)
		const e = document.getElementById('mnl-finance')
		const apple = e.getBoundingClientRect().top
		console.log(apple)	
		table.scrollTo(0,apple)*/
	})
	//Side: Content edit
	document.getElementById('edit-btn').addEventListener('click',()=>{
		const btnArr = document.querySelectorAll('td:not(.edit-off),th:not(.edit-off)')
		for(var i=0;i<btnArr.length;i++){
			const e=btnArr[i]
			e.contentEditable = 'true'
		}
	})
	//Side: Uploading preparation
	document.getElementById('mnl-main').addEventListener('click',async(event)=>{
		const e = event.target
		const isUpload = e.classList.contains('send-btn')
		if(isUpload){
			const td = e.parentNode
			td.classList.add('upload-zone')
		}
	})
	//Side: Main uploading Function
	document.getElementById('save-btn').addEventListener('click',async(event)=>{
		const uploadArr = document.querySelectorAll('.upload-zone')
		for(var i=0;i<uploadArr.length;i++){
			const td = uploadArr[i]
			const tr = td.parentNode
			const exPath = tr.classList[0].substring(4)
			const path = 'manual/' + exPath
			const id = tr.children[0].innerHTML
			const receipt = await uxUpload(path,td,id)
			let content = ''
			for(var a=0;a<receipt.length;a++){
				const r = receipt[a]
				const arr = r.split('/')
				const name = extDate(true,'-')
				const url = `<p id='` + r + `' class='dl-link select-item'>` + name + `</p>`
				content = content + url
			}
			const inputPart = `<input class="edit-mode upload-btn hide" type="file">`
			const uploadPart = `<p class='send-btn edit-mode'>Upload</p>`
			content = content + inputPart + uploadPart
			td.innerHTML = content
		}
		uxSave()
	})
	/*
	document.getElementById('function-menu').addEventListener('click',async(event)=>{
		const isSave = event.target.id == 'save-btn'
		if(isSave){
			const uploadArr = document.querySelectorAll('.upload-zone')
			for(var i=0;i<uploadArr.length;i++){
				const td = uploadArr[i]
				const tr = td.parentNode
				const exPath = tr.classList[0].substring(4)
				const path = 'manual/' + exPath
				const id = tr.children[0].innerHTML
				const receipt = await uxUpload(path,td,id)
				let content = ''
				for(var a=0;a<receipt.length;a++){
					const r = receipt[a]
					const arr = r.split('/')
					const name = extDate(true,'-')
					const url = `<p id='` + r + `' class='dl-link select-item'>` + name + `</p>`
					content = content + url
				}
				const inputPart = `<input class="edit-mode upload-btn hide" type="file">`
				const uploadPart = `<p class='send-btn edit-mode'>Upload</p>`
				content = content + inputPart + uploadPart
				td.innerHTML = content
			}
		uxSave()
		}
	})*/
	//Side: Add new file
	document.getElementById('new-btn').addEventListener('click',(event)=>{
		const selected = uxSelect()
		if(selected){
			const tr = selected.closest('tr')
			if(tr.classList.length){
				const department = tr.classList[0]	
				const start = document.querySelector('.' + department + '.mnl-title')
				const firstData = start.nextElementSibling
				const lastid = firstData.children[0].innerHTML
				const id = Number(lastid) + 1
				const prefix = `<tr class="`+ department +`">`
				const idPart = `<td class="mnl-id">`+ id +`</td>`
				const namePart = `<td class="mnl-name">name</td>`
				const attachPart = `<td class="mnl-file edit-off"><input class="edit-mode upload-btn" type="file"><p class="send-btn edit-mode">Upload</p></td>`
				const suffix = `</tr>`
				const content = prefix + idPart + namePart + attachPart + suffix
				start.insertAdjacentHTML('afterend',content)
			}					
		}		
	})
}
// Initialize
const mnlInit = async(t)=>{
	const hasBuild = await mnlBuild(t)
	if(hasBuild){
		mnlFunc()
	}
}