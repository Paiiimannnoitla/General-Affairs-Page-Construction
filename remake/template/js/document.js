
// Rendering
const docBuild = async(t)=>{
	if(t){
		return true
	}
	const isRendered = await Render('document')
	if(isRendered){
		const output = new Promise((resolve)=>{
			resolve(true)
		})
		return output
	}
}
	//Side: Main uploading Function
const docUpload = async()=>{
	const uploadArr = document.querySelectorAll('.upload-zone')
	for(var i=0;i<uploadArr.length;i++){
		const td = uploadArr[i]
		const tbody = td.closest('tbody')
		const exPath = tbody.classList[0].substring(4)			
		const path = 'doc/' + exPath
			
		const tr = td.parentNode
		const id = tr.children[0].innerHTML
			
		const receipt = await uxUpload(path,td,id)
		let content = ''
		for(var a=0;a<receipt.length;a++){
			const r = receipt[a]
			const arr = r.split('/')
			const name = arr[arr.length-1]
			const url = `<p id='` + r + `' class='dl-link select-item'>` + name + `</p>`
			content = content + url
		}
		const inputPart = `<input class="edit-mode upload-btn hide" type="file">`
		const uploadPart = `<p class='send-btn edit-mode hide'>Upload</p>`
		content = content + inputPart + uploadPart
		td.innerHTML = content
		console.log(1)
	}
	return true
}
// Save process
const docSaveCheck = (arr)=>{
	console.log(arr)
	return false
}
// Main: Edit Function
const docFunc = ()=>{
	uxLoginCheck()
	const main = document.getElementById('doc-main')
	//Side: Content edit
	document.getElementById('edit-btn').addEventListener('click',()=>{
		const btnArr = document.querySelectorAll('td:not(.edit-off),th:not(.edit-off)')
		for(var i=0;i<btnArr.length;i++){
			const e=btnArr[i]
			e.contentEditable = 'true'
		}
	})
	//Side: Uploading preparation
	document.getElementById('doc-main').addEventListener('click',async(event)=>{
		const e = event.target
		const isUpload = e.classList.contains('send-btn')
		if(isUpload){
			const td = e.parentNode
			td.classList.add('upload-zone')
		}
	})

	//Side: Add new file
	document.getElementById('new-btn').addEventListener('click',async()=>{
		const rowArr = document.querySelectorAll('.doc-row')
		const insertPos = rowArr[0]
		
		const doctr = await load('doc',[0],'row-default')
		insertPos.insertAdjacentHTML('afterend',doctr)
			
	})
	//Side: Setting document sort 
	main.addEventListener('click',(event)=>{
		const e = event.target
		const isOption = e.classList.contains('doc-depart-menu')
		if(isOption){
			const value = e.value
			const opArr = e.options
			for(var i=0;i<opArr.length;i++){
				opArr[i].removeAttribute('selected')
			}
			const currsort = e.options[e.selectedIndex]
			currsort.setAttribute('selected',true)
			
			const newsort = 'doc-' + value
			const docrow = e.closest('.doc-row')
			const oldsort = docrow.classList[1]
			if(!oldsort){
				docrow.classList.add(newsort)
			}else{
				docrow.classList.replace(oldsort,newsort)
			}
		}
	})
	//Side: Updated mark Function
	main.addEventListener('click',(event)=>{
		const isEdit = uxCheck() == 'Edit'
		if(isEdit){
			const tr = event.target.closest('tr')
			const isTitle = tr.classList.contains('non-delete')
			if(!isTitle){
				tr.classList.add('updated')
			}
		}
		
	})
	//Side: Save Function
	document.getElementById('save-btn').addEventListener('click',async()=>{
		const updateArr = document.querySelectorAll('.updated')
		const isDone = await docSaveCheck(updateArr)
		if(!isDone){
			console.log('Not yet!')
			return
		}
		const isUpload = await docUpload()
		if(isUpload){
			
		}
	})
}
// Initialize
const docInit = async(t)=>{
	const hasBuild = await docBuild(t)
	if(hasBuild){
		docFunc()
	}
}