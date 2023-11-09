
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
	//Counting this element is position at the n-th
const formCount = (e)=>{
	const sopform = e.closest('.sop-form')
	const trArr = sopform.children[1].children
	const num = Array.prototype.indexOf.call(trArr,e)
	//return num
	return [trArr,num]
}

// Sorting steps id
const idWrite = (sopform)=>{
	const newRow = document.querySelector('.new-id')
	newRow.classList.remove('new-id')	
	const currtr = newRow.parentNode
	let prevtr = currtr.previousElementSibling
	const isNote = prevtr.classList.contains('sop-note')
	if(isNote){
		while(prevtr.classList.contains('sop-note')){
			prevtr = prevtr.previousElementSibling
		}
	}
	
	const previd = prevtr.children[0]
	const isSort = previd.classList.contains('sop-form-sort')
	let currid = ''
	
	if(isSort){
		currid = 1
	}else{
		currid = Number(previd.innerHTML) + 1
	}
	
	let n = currid
	//const trArr = sopform.children[1].children
	//const currOrder = Array.prototype.indexOf.call(trArr,currtr)
	const [trArr,currOrder] = formCount(currtr)
	for(var i=currOrder;i<trArr.length;i++){
		const e = trArr[i]
		const updateDiv = e.children[0]
		const isSort = updateDiv.classList.contains('sop-form-sort')
		const isid = updateDiv.classList.contains('sop-id')
		const isValid = isid - isSort
		if(isValid){
			updateDiv.innerHTML = n
			n = n + 1
		}else if(updateDiv.classList.contains('sop-form-chapter')){
			break
		}
	}
}

const sopSave = async()=>{
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
		//Side: SOP Form chapter content tracker
	main.addEventListener('input',(event)=>{
		const e = event.target
		const isChapter = e.classList.contains('sop-form-chapter')
		if(isChapter){
			const sopform = e.closest('.sop-form')
			const chArr = sopform.querySelectorAll('.sop-chapter-content')
			const currid = Array.prototype.indexOf.call(chArr,e)
		
			const bookArr = sopform.querySelectorAll('.sop-form-bookmark')
			const bookmark= bookArr[currid]
			const chname = e.innerHTML
			const chid = e.previousElementSibling.innerHTML
			const content = chid + ':' + chname
			bookmark.innerHTML = content
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
	//main.addEventListener('mousedown',(event)=>{
	document.getElementById('sop-form-function-menu').addEventListener('mousedown',(event)=>{
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
				console.log(arr)
				return el.classList.contains(arr)
			}
		}
		const isDelete =	has('sop-btn-delete')
		const isNote =		has('sop-btn-newnote')
		const isChapter = 	has('sop-btn-newchapter')
		const isStep = 		has('sop-btn-newstep')
		const isTrigger = isDelete + isNote + isChapter + isStep
		
		if(isDelete){
			//Side: Delete row
			let selected = uxSelect()
			console.log(selected)
			const isSort = has('sop-form-sort',selected)
			if(isSort){
				selected = selected.parentNode.nextElementSibling.children[0]
			}
			if(selected){
				const isNormal = has(delArr,selected)
				const isch = has('sop-form-chapter',selected)
				if(isNormal){
					const delDiv = selected.closest('tr')
					let sopRow = delDiv.nextElementSibling
					
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
					while(has('sop-note',sopRow)){
						const target = sopRow
						sopRow = target.nextElementSibling
						target.remove()
					}
					const isRow = has('sop-id',sopRow.children[0])
					if(isRow){
						sopRow.children[0].classList.add('new-id')						
						idWrite(sopform)
					}
			//Side: Delete chapter
				}else if(isch){
					//Positioning
					const sopform = selected.closest('.sop-form')
					const trArr = sopform.children[1].children
					const chidArr = sopform.querySelectorAll('.sop-chapter-id')
					const chArr = []
					for(var i=0;i<chidArr.length;i++){
						chArr[i] = chidArr[i].parentNode
					}
					const currch = selected.parentNode
					const currid = formCount(currch)
					
					const chcurrid = Array.prototype.indexOf.call(chArr,currch)
					
					let lastid = ''
					const isLast = chcurrid == chArr.length - 1
					if(isLast){
						//const lastch = sopform.querySelector('.sop-btn-table').parentNode.parentNode
						const lasttr = trArr[trArr.length-1]
						lastid = formCount(lasttr) + 1
						
					}else{
						const chlastid = chcurrid + 1
						const lastch = chArr[chlastid]
						lastid = formCount(lastch)
					}
					
					const delCount = lastid - currid
					
					// Delete Chapter
					for(var i=0;i<delCount;i++){
						trArr[currid].remove()
					}
					// Delete Bookmark
					const bmArr = sop.querySelectorAll('.sop-form-bookmark')
					const bmtr = bmArr[chcurrid].parentNode
					bmtr.remove()
					// Sorting
					if(!isLast){
						const bmsortArr = Array.prototype.slice.call(bmArr,chcurrid+1)
						const sortArr = Array.prototype.slice.call(chArr,chcurrid + 1)
						for(var i=0;i<sortArr.length;i++){
							const ch = sortArr[i]
							const b = bmsortArr[i]
							
							const chtitle = 'Chapter ' + (chcurrid + 1 + i)
							ch.children[0].innerHTML = chtitle
							
							const chname = e.children[1].innerHTML
							const chfull = chtitle + ':' + chname
							
							b.innerHTML = chfull
						}
					}
					
				}
			}
		}
		if(isNote){
			const selected = uxSelect()
			if(selected){
				const isRow = has('sop-form-row',selected)
				if(isRow){
					const tr = selected.parentNode
					const prefix = `<tr class="sop-note">`
					const headerPart = `<td contenteditable='true' class="sop-form-row sop-note-header">註解</td>`
					const contentPart = `<td contenteditable='true' colspan="3" class="sop-form-row sop-note-content" style="">Insert note </td>`
					const suffix = `</tr>`
				
					const content = prefix + headerPart + contentPart + suffix
					tr.insertAdjacentHTML('afterend',content)
				}				
			}
		}
		if(isChapter){
			const selected = uxSelect()
			if(selected){
				const clsArr = ['sop-form-row','sop-form-sort','sop-form-chapter']
				const isRow = has(clsArr,selected)
				if(isRow){
					// Chapter content making
					const tr = selected.parentNode
					const prefix = `<tr>`
					const suffix = `</tr>`
					
					const chid = `<th colspan='1' class='sop-form-chapter sop-chapter-id edit-off'></th>`
					const chTitle = `<th colspan="3" contenteditable='true' class="sop-form-chapter sop-chapter-content"></th>`
					const chPart = prefix + chid + chTitle + suffix
					
					const introContent = `<td colspan="4" class="sop-form-intro"></td>`
					const introPart = prefix + introContent + suffix
					
					const sortid = `<th class="sop-form-sort sop-id edit-off">步驟</th>`
					const sortShort = `<th class="sop-form-sort sop-short edit-off">簡要</th>`
					const sortLong = `<th class="sop-form-sort sop-long edit-off">詳述</th>`
					const sortAttach = `<th class="sop-form-sort sop-attach edit-off">附件</th>`
					const sortPart = prefix + sortid + sortShort + sortLong + sortAttach + suffix
					
					const rowid = `<td class="sop-form-row sop-id">1</td>`
					const rowShort = `<td contenteditable='true' class="sop-form-row sop-short"></td>`
					const rowLong = `<td contenteditable='true' class="sop-form-row sop-long"></td>`
					const rowAttach = `<td class="sop-form-row sop-attach"><input class="edit-mode upload-btn" type="file"><p class="send-btn edit-mode">Upload</p></td>`
					const rowPart = prefix + rowid + rowShort + rowLong + rowAttach + suffix
					
					const content = chPart + introPart + sortPart + rowPart
					// Insert positioning
					const sopform = tr.closest('.sop-form')
					const trArr = sopform.children[1].children
					const chidArr = sopform.querySelectorAll('.sop-chapter-id')
					
					const chArr = []
					for(var i=0;i<chidArr.length;i++){
						const e = chidArr[i]
						chArr[i] = e.parentNode
					}
					
					const chnumArr = []
					for(var i=0;i<chArr.length;i++){
						const e = chArr[i]
						chnumArr[i] = Array.prototype.indexOf.call(trArr,e)
					}
					
					const [_,currPos] = formCount(tr)
					let insertPos = ''
					let followArr = []
					const chnumLen = chnumArr.length
					if(currPos>=chnumArr[chnumLen-1]){
						insertPos = trArr.length-1
					}else{
						console.log(currPos)
						for(var i=0;i<chnumLen;i++){
							const e = chnumArr[i]
							console.log(e)
							if(e>currPos){
								insertPos = e - 1							
								console.log(insertPos)
								followArr = chArr.slice(i)
								break
							}
						}
					}
					
					// Write chapter content					
					const insertDiv = trArr[insertPos]
					console.log(trArr)
					console.log(insertPos)
					console.log(insertDiv)
					insertDiv.insertAdjacentHTML('afterend',content)
					// Catalogue updating
					const newchidnum = chnumLen - followArr.length + 1
					const bmtitle = 'Chapter ' + newchidnum + ':'
					const bmcontent = `<tr><td class="sop-form-bookmark edit-off">`+bmtitle+`</td></tr>`
	
					const bmnewid = newchidnum - 2
					const bmArr = sopform.querySelectorAll('.sop-form-bookmark')
					const bminsertPos = bmArr[bmnewid].parentNode
					bminsertPos.insertAdjacentHTML('afterend',bmcontent)
					// Auto sort chapter id
					const newch = insertDiv.nextElementSibling
					const newchid = newch.querySelector('.sop-chapter-id')
					const evt = new Event("input",{bubbles:true})
					for(var i=0;i<followArr.length;i++){
						const e = followArr[i]
						const id = chnumLen - followArr.length + i + 2
						e.children[0].innerHTML = 'Chapter ' + id

						e.children[1].dispatchEvent(evt)
					}
					
					newch.children[0].innerHTML = 'Chapter ' + newchidnum
					
					
	
				}
			}
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
				
				const sopform = selected.closest('.sop-form')
				const isValid = has(['sop-form-row','sop-form-sort'],selected)
				if(isValid){
					insertDiv = selected.parentNode
	
					//const trArr = sopform.children[1].children
					//const currid = Array.prototype.indexOf.call(trArr,insertDiv)
					const [trArr,currid] = formCount(insertDiv)
					for(var i=currid+1;i<trArr.length;i++){
						const e = trArr[i]
						const isNote = has('sop-note',e)
						if(isNote){
							insertDiv = e
						}else{
							break
						}
					}
					
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