
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
	//Side: Main uploading Function
	document.getElementById('save-btn').addEventListener('click',async(event)=>{
		const uploadArr = document.querySelectorAll('.upload-zone')
		for(var i=0;i<uploadArr.length;i++){
			const td = uploadArr[i]
			const tr = td.parentNode
			const exPath = tr.classList[0].substring(4)
			const path = 'document/' + exPath
			const id = tr.children[0].innerHTML
			const receipt = await uxUpload(path,td,id)
			let content = ''
			for(var a=0;a<receipt.length;a++){
				const r = receipt[a]
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
	//Side: Add new file
	document.getElementById('new-btn').addEventListener('click',(event)=>{
		const selected = uxSelect()
		if(selected){
			const isTitle = selected.id == 'doc-title'
			if(isTitle){
				return
			}
			const tr = selected.closest('tr')
			if(tr.classList.length){
				const department = tr.classList[0]	
				const start = document.querySelector('.' + department + '.doc-title')
				const firstData = start.nextElementSibling
				const lastid = firstData.children[0].innerHTML
				let id = Number(lastid) + 1
				const prefix = `<tr class="`+ department +`">`
				const idPart = `<td class="doc-id edit-off">`+ id +`</td>`
				const namePart = `<td class="doc-name" contenteditable="true">name</td>`
				const attachPart = `<td class="doc-file edit-off"><input class="edit-mode upload-btn" type="file"><p class="send-btn edit-mode">Upload</p></td>`
				const suffix = `</tr>`
				const content = prefix + idPart + namePart + attachPart + suffix
				start.insertAdjacentHTML('afterend',content)
			}					
		}		
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
}
// Initialize
const docInit = async(t)=>{
	const hasBuild = await docBuild(t)
	if(hasBuild){
		docFunc()
	}
}