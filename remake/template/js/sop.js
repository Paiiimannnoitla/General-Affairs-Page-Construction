
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
	uxCancel(false)
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
		//Side: SOP Form menu button function
	main.addEventListener('mousedown',(event)=>{
		const e = event.target
		const delArr = ['sop-form-row']
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
		/*
		const isDelete =	e.classList.contains('sop-btn-delete')
		const isNote =		e.classList.contains('sop-btn-newnote')
		const isChapter = 	e.classList.contains('sop-btn-newchapter')
		const isStep = 		e.classList.contains('sop-btn-newstep')*/
		const isDelete =	has('sop-btn-delete')
		const isNote =		has('sop-btn-newnote')
		const isChapter = 	has('sop-btn-newchapter')
		const isStep = 		has('sop-btn-newstep')
		if(isDelete){
			const selected = uxSelect()
			if(selected){
				const isValid = has(delArr,selected)
				if(isValid){
					selected.closest('tr').remove()
				}
			}
		}
		if(isNote){
			console.log('note')
		}
		if(isChapter){
			console.log('chapter')
		}
		if(isStep){
			console.log('step')
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
		//uxSave()
	})

}
const sopInit = async(test) =>{
	const hasBuild = await sopBuild(test)
	if(hasBuild){
		sopFunc()
	}
}