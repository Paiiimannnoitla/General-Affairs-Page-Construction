
// Rendering
const dawBuild = async(t)=>{
	if(t){
		return true
	}
	const isRendered = await Render('daw')
	if(isRendered){
		const output = new Promise((resolve)=>{
			resolve(true)
		})
		return output
	}
}
	//Side: Main uploading Function
const dawUpload = async()=>{
	/*
	const uploadArr = dawument.querySelectorAll('.upload-zone')
	for(var i=0;i<uploadArr.length;i++){
		const td = uploadArr[i]
		const tbody = td.closest('tbody')
		const exPath = tbody.classList[0].substring(4)			
		const path = 'daw/' + exPath
			
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
	}
	return true
	*/
}
// Save process
const dawSaveCheck = (arr)=>{
	/*
	let pass = true
	//Sort Check
	const unsortArr = dawument.querySelectorAll('.daw-notsort')
	if(unsortArr.length){
		let target
		for(var i=0;i<unsortArr.length;i++){
			const e = unsortArr[i]
			const formRoot = e.closest('tr')
			const isDeleted = formRoot.classList.contains('daw-deleted')
			if(isDeleted){
				continue
			}
			target = e
			break
		}
		if(target){
			uxMove(target)
			target.addEventListener('animationend',()=>{
				target.classList.remove('shaking')
			},{once:true})
			target.classList.add('shaking')
			pass = false
		}
	}
	return pass
	*/
}
// Main: Edit Function
const dawFunc = ()=>{
	/*
	uxLoginCheck()
	const main = dawument.getElementById('daw-main')
	//Side: Content edit
	dawument.getElementById('edit-btn').addEventListener('click',()=>{
		const btnArr = dawument.querySelectorAll('td:not(.edit-off),th:not(.edit-off)')
		for(var i=0;i<btnArr.length;i++){
			const e=btnArr[i]
			e.contentEditable = 'true'
		}
	})
	//Side: Uploading preparation
	dawument.getElementById('daw-main').addEventListener('click',async(event)=>{
		const e = event.target
		const isUpload = e.classList.contains('send-btn')
		if(isUpload){
			const td = e.parentNode
			td.classList.add('upload-zone')
		}
	})

	//Side: Add new file
	dawument.getElementById('new-btn').addEventListener('click',async()=>{
		const rowArr = dawument.querySelectorAll('.daw-row')
		const insertPos = rowArr[0]
		
		const dawtr = await load('daw',[0],'row-default')
		insertPos.insertAdjacentHTML('afterend',dawtr)
			
	})
	//Side: Setting dawument sort 
	main.addEventListener('click',(event)=>{
		const e = event.target
		const isOption = e.classList.contains('daw-depart-menu')
		if(isOption){
			const value = e.value
			const opArr = e.options
			for(var i=0;i<opArr.length;i++){
				opArr[i].removeAttribute('selected')
			}
			const currsort = e.options[e.selectedIndex]
			currsort.setAttribute('selected',true)
			
			const newsort = 'daw-' + value
			const dawrow = e.closest('.daw-row')
			const oldsort = dawrow.classList[1]
			if(!oldsort){
				dawrow.classList.add(newsort)
			}else{
				dawrow.classList.replace(oldsort,newsort)
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
	dawument.getElementById('save-btn').addEventListener('click',async()=>{
		const updateArr = dawument.querySelectorAll('.updated')
		const isDone = await dawSaveCheck(updateArr)
		if(!isDone){
			console.log('Not yet!')
			return
		}
		const isUpload = await dawUpload()
		if(isUpload){
			for(var i=0;i<updateArr.length;i++){
				const u = updateArr[i]
				u.classList.remove('updated')
			}
			uxSave()
		}
	})
	*/
}
// Initialize
const dawInit = async(t)=>{
	const hasBuild = await dawBuild(t)
	if(hasBuild){
		dawFunc()
	}
}