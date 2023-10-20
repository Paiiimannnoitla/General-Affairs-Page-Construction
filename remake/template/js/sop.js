
const sopBuild = async(test) =>{
	if(test){
		return true
	}
	const isRendered = await Render('sop')
	if(isRendered){
		const output = new Promise((resolve)=>{
			resolve(true)
		})
		return output
	}
}
const sopSave = async()=>{
	//uxCancel(false)
	uxCancel()
	const updateArr = document.querySelectorAll('.updated:not(.not-save)')
	const receipt = []
	const testbtn = document.getElementById('test-btn')
	const isTest = testbtn.classList.contains('hide')
	const promiseChain = []
	for(var i=0;i<updateArr.length;i++){
		promiseChain[i] = new Promise(async(resolve)=>{
			const u = updateArr[i]
			const tbody = u.children[1]
			const content = tbody.innerHTML
			const sopid = u.children[0].id
			const id = sopid.substring(4)
			let func = 'sop'
			if(isTest){
				func = func + '-test'
			}
			const isSaved = await Delivery(func,id,content)
			if(isSaved){		
				//u.classList.remove('updated')
				console.log(u.querySelector('.sop-form-header').innerHTML + ' is saved')
				resolve(true)
			}
		})		
	}
	const output = await Promise.all(promiseChain)
	return output
}
// Activate cells edit attribute
const sopEdit = ()=>{
	const btnArr = document.querySelectorAll('td:not(.edit-off),th:not(.edit-off)')
	for(var i=0;i<btnArr.length;i++){
		const e = btnArr[i]
		e.contentEditable = 'true'
	}
	const hideArr = document.querySelectorAll('.sop-btn-table.hide')
	unhide(hideArr)
}
//All direct function in SOP page
const sopFunc = ()=>{
	uxLoginCheck()
	const main = document.getElementById('sop-main')
	//Main: Edit Function
		//Side: Content edit 
	document.getElementById('edit-btn').addEventListener('click',()=>{
		sopEdit()
	})
		//Side:	Content selection
	main.addEventListener('click',(event)=>{
		const e = event.target
		const isEditable = e.contentEditable == 'true'
		if(isEditable){
			
			const isFocused = e.classList.contains('focused')
			if(!isFocused){
				const range = document.createRange()
				range.selectNodeContents(e)
				const sel = window.getSelection()
				sel.removeAllRanges()
				sel.addRange(range)
				const focusDiv = document.querySelector('.focused')
				if(focusDiv){
					const isSame = focusDiv == e
					if(!isSame){	
						focusDiv.classList.remove('focused')
					}
				}
				
				e.classList.add('focused')			
			}
		}
	})
		//Side: SOP content loader
	main.addEventListener('click',async(event)=>{
		const e = event.target
		const isHead = e.classList.contains('sop-form-header')
		if(isHead){		
			const isEdit = uxCheck() == 'Edit'
			const thead = e.closest('thead')
			const tbody = thead.nextElementSibling
			const table = thead.parentNode
			const id = thead.id.substring(4)
			const isUpdated = table.classList.contains('updated')
			if(isUpdated){
				const isHide = tbody.classList.contains('hide')
				if(isHide){
					unhide(tbody)
					table.classList.remove('not-save')
				}else{
					hide(tbody)
					table.classList.add('not-save')
				}
			}else{
				//Loading extra content
				let html = await load('sop',[id],'sop')
				if(!html){
					html = await load('sop',[0],'sop')
				}				
				tbody.innerHTML = html	
				table.classList.add('updated')
				const isEdit = uxCheck() == 'Edit'
				if(isEdit){
					sopEdit()
				}
			}
		}		
	})
		//Side: SOP Form attach file input manager
	main.addEventListener('change',(event)=>{
		const e = event.target
		const isUpload = e.classList.contains('upload-btn')
		if(isUpload){
			const td = e.parentNode
			const inputArr = td.querySelectorAll('input')
			const len = inputArr.length
			if(len){
				let n = 0			
				for(var i=0;i<len;i++){
					const el = inputArr[len-i-1]
					const isOccupied = el.files[0]
					if(!isOccupied){
						if(n){
							el.remove()
						}else{
							n = 1
						}
					}
				}
				if(!n){
					const content = `<input class="edit-mode upload-btn" type="file">`
					const insertDiv = inputArr[len-1]
					insertDiv.insertAdjacentHTML('afterend',content)
				}
			}
			
		}
	})
		//Side: SOP Form attach upload preparation
	main.addEventListener('click',(event)=>{
		const e = event.target
		const isUpload = e.classList.contains('send-btn')
		if(isUpload){
			const td = e.parentNode
			td.classList.add('upload-zone')
		}		
	})
		//Side: Main uploading Function
	const sopUpload = async()=>{
		const uploadArr = document.querySelectorAll('.upload-zone')
		for(var i=0;i<uploadArr.length;i++){
			const td = uploadArr[i]
			const tbody = td.closest('tbody')
			const exPath = tbody.classList[0].substring(4)			
			const path = 'sop/' + exPath
			
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
		//Side: SOP Form menu button function
	main.addEventListener('mousedown',(event)=>{
		const e = event.target
		const delArr = ['sop-form-row']
			//Class list checker
		const has = (arr,el=e)=>{
			const isArray = arr.constructor == Array
			if(isArray){
				let n = 0
				for(var i=0;i<arr.length;i++){
					n = n + el.classList.contains(arr[i])
				}
				return n 
			}else{
				return el.classList.contains(arr)
			}
		}
			//id generate and overwrite
		const idWrite = (sopform)=>{
			const newRow = document.querySelector('.new-id')
			newRow.classList.remove('new-id')
			const idArr = sopform.querySelectorAll('.sop-id')
			const currid = Array.prototype.indexOf.call(idArr,newRow)
			const idLen = idArr.length
			for(var i=currid;i<idLen;i++){
				const id = idArr[i]
				id.innerHTML = i
			}
		}
		const isDelete =	has('sop-btn-delete')
		const isNote =		has('sop-btn-newnote')
		const isChapter = 	has('sop-btn-newchapter')
		const isStep = 		has('sop-btn-newstep')
		const isTrigger = isDelete + isNote + isChapter + isStep
		
		if(isDelete){
			//Side: Delete row
			const selected = uxSelect()
			if(selected){
				const isValid = has(delArr,selected)
				if(isValid){
					const delDiv = selected.closest('tr')
					const sopRow = delDiv.nextElementSibling
					
					// Delete or Clear handler
					const sopform = sopRow.closest('.sop-form') 
					const idnum = sopform.querySelectorAll('.sop-id').length
					if(idnum>2){
						delDiv.remove()
					}else{
						delDiv.children[0].innerHTML = 1
						delDiv.children[1].innerHTML = ''
						delDiv.children[2].innerHTML = ''
						
						const atchInput = `<input class="edit-mode upload-btn" type="file">`
						const atchUpload = `<p class="send-btn edit-mode">Upload</p>`
						delDiv.children[3].innerHTML = atchInput + atchUpload
					}
					const isRow = has('sop-id',sopRow.children[0])
					if(isRow){
						sopRow.children[0].classList.add('new-id')						
						idWrite(sopform)
					}
				}
			}
		}
		if(isNote){
			console.log('note')
		}
		if(isChapter){
			console.log('chapter')
		}
			//Side: Add a new step
		if(isStep){
			const selected = uxSelect()
			if(selected){
				const prefix = `<tr>`
				const idPart = `<td class="sop-form-row sop-id new-id">id placeholder</td>`
				const shortPart = `<td class="sop-form-row sop-short" contenteditable='true'>Please input short description</td>`
				const longPart = `<td class="sop-form-row sop-long" contenteditable='true'>Please input long description</td>`
				
				const atchPrefix = `<td class="sop-form-row sop-attach">`
				const atchInput = `<input class="edit-mode upload-btn" type="file">`
				const atchUpload = `<p class="send-btn edit-mode">Upload</p>`
				const atchSuffix = `</td>`
				const attachPart = atchPrefix + atchInput + atchUpload + atchSuffix
				
				const suffix = `</tr>`
				const content = prefix + idPart + shortPart + longPart + attachPart + suffix 
				
				const selForm = selected.closest('.sop-form')
				const sopform= e.closest('.sop-form')
				const isSame = selForm == sopform
				const isValid = has(['sop-form-row','sop-form-sort'],selected)
				const isBoth = isSame + isValid == 2
				if(isBoth){
					insertDiv = selected.parentNode
				}else{				
					const rowArr = sopform.querySelectorAll('.sop-form-row')
					const lastRow = rowArr[rowArr.length-1]
					insertDiv = lastRow.parentNode
				}
				insertDiv.insertAdjacentHTML('afterend',content)
				idWrite(sopform)		
			}
		}
		if(isTrigger){
			e.style.removeProperty('background')
		}
		
	})
		//Side: Add new SOP Form
	document.getElementById('new-btn').addEventListener('click',()=>{
		let selected = uxSelect()
		let id = main.children.length + 1
		if(!selected){
			selected = main.children[id-2]
		}
		const insertDiv = selected.closest('.sop-form-init')			
		while(document.querySelector('.sop-' + id)){
			id= id+1
		}
		const sopid = 'sop-' + id
		const prefix = `<tr class='sop-form-init'><td class="edit-off"><table class="sop-form">`
		const suffix = `</table></td></tr>`
			
		const theadPrefix = `<thead id="`+ sopid +`">`
		const trPart = `<tr><th colspan="4" class="sop-form-header" contenteditable="true">Title</th></tr>`
		const theadSuffix = `</thead>`
		const tbodyPart = `<tbody class="`+ sopid +`"></tbody>`
		const theadPart = theadPrefix + trPart + theadSuffix
		const contentPart = theadPart + tbodyPart
			
		const content = prefix + contentPart + suffix
			
		insertDiv.insertAdjacentHTML('afterend',content)	
		
	})
		//Side: Delete SOP Form
	document.getElementById('sop-btn-deleteform').addEventListener('click',()=>{
		const selected = uxSelect()
		if(selected){
			const sopform = selected.closest('.sop-form-init')
			sopform.remove()
		}
	})
		//Side: Save Function
	document.getElementById('save-btn').addEventListener('click',async()=>{
		const isUpload = await sopUpload()
		if(isUpload){
			console.log(2)
			const isSaved = await sopSave()
			if(isSaved){
				const updateArr = document.querySelectorAll('.updated')
				for(var i=0;i<updateArr.length;i++){
					const u = updateArr[i]
					u.classList.remove('updated')
					u.children[1].innerHTML = ''
				}
				uxSave()
			}
		}
	})

}
const sopInit = async(test) =>{
	const hasBuild = await sopBuild(test)
	if(hasBuild){
		sopFunc()
	}
}