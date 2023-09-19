
const busBuild = async(test) =>{
	if(test){
		return true
	}
	const isRendered = await Render('business')
	if(isRendered){
		const output = new Promise((resolve)=>{
			resolve(true)
		})
		return output
	}
}
const busHead = (tr)=>{
	const nodeList = document.getElementById('bus-main').children
	const id = tr.rowIndex
	for(var i=id;i>2;i--){
		const e = nodeList[i]
		const isHead = e.classList.contains('bus-member-head')
		if(isHead){
			return e
		}
	}
}
const busFunc = ()=>{
	uxLoginCheck()
	const main = document.getElementById('bus-main')
	//Main: Edit Function
		//Side: Department selection
	document.getElementById('bus-department').addEventListener('click',(event)=>{
		const e = event.target
		const isHeader = e.classList.contains('bus-header')
		const selected = document.querySelector('.selected-department')
		selected.classList.remove('selected-department')
		e.classList.add('selected-department')
		const prev = selected.id
		const department = e.id
		const prevArr = document.querySelectorAll('.' + prev)
		hide(prevArr)
		const status = uxCheck() == 'Edit'
		if(status){			
			const currArr = document.querySelectorAll('.' + department)
			unhide(currArr)
		}else{
			const currArr = document.querySelectorAll('.' + department + ':not(.bus-new)')
			unhide(currArr)
		}	
		const currName = e.innerHTML
		const updateDiv = document.getElementById('bus-text')
		updateDiv.children[0].innerHTML = currName		
		const newColor = e.id + '-color'
		const prevColor = updateDiv.classList[1]
		updateDiv.classList.replace(prevColor,newColor)
	})
		//Side: Append new row
	document.getElementById('new-btn').addEventListener('click',(event)=>{		
		
	})	
		//Side: Append new job row
	main.addEventListener('click',(event)=>{
		const e = event.target
		const isAppend = e.classList.contains('bus-placeholder')
		if(isAppend){
			const department = document.querySelector('.selected-department').id
			const head = document.querySelector('.' + department + '.bus-member-head')
			const first = head.children[0]
			const row = first.rowSpan
			first.rowSpan = row + 1
			const prefix = `<tr class='`+ department +`'>`
			const job = `<td colspan='2' contenteditable='true'>Input here</td>`
			const suffix = `</tr>`
			const content = prefix + job + suffix
			const tr = e.parentNode
			tr.insertAdjacentHTML('beforebegin',content)
			
			
		}
	})
		//Side: Content edit 
	const editbtn = document.getElementById('edit-btn')
	editbtn.addEventListener('click',()=>{
		const btnArr = document.querySelectorAll('td:not(.edit-off),th:not(.edit-off)')
		for(var i=0;i<btnArr.length;i++){
			const e = btnArr[i]
			e.contentEditable = 'true'
		}
		const headArr = document.querySelectorAll('.bus-member')
		for(var i=0;i<headArr.length;i++){
			const e = headArr[i]
			const row = e.rowSpan
			e.rowSpan = row +1
		}
		const selected = document.querySelector('.selected-department')
		const config = { attributes: true, childList: true, subtree: true }
		const callback = (mutArr)=>{
			for(let mutation of mutArr){
				if(mutation.type === 'attributes'){
					const state = mutation.target.classList.contains('hide')
					if(state){
						selected.click()
						observer.disconnect()
					}
				}
			}
		}
		const observer = new MutationObserver(callback)
		observer.observe(editbtn,config)
		
	})
		//Side: Unedit Function
	document.getElementById('unedit-btn').addEventListener('click',()=>{
		const headArr = document.querySelectorAll('.bus-member')
		for(var i=0;i<headArr.length;i++){
			const e = headArr[i]
			const row = headArr.rowSpan
			headArr.rowSpan = row -1
		}
	})
		//Side: Delete Function
	document.getElementById('delete-btn-bus').addEventListener('click',()=>{
		const cell = uxSelect()
		const tr = cell.closest('tr')
		const id = tr.rowIndex
		const isMember = tr.classList.contains('bus-member-head')
		const main = document.getElementById('bus-main')
		const nodeList = main.children
		const table = document.getElementById('business')
			//Select Name
		if(isMember){
			tr.remove()
			for(var i=id;i<nodeList.length;i++){
				const e = table.rows[id]
				const isHead = e.classList.contains('bus-member-head')				
				if(isHead){
					return
				}
				e.remove()
			}
		}
			//Select Job
		const isJob = id > 2
		if(isJob){
			const headtr = busHead(tr)
			const head = headtr.children[0]
			const row = head.rowSpan - 1
			head.rowSpan = row
			tr.remove()
			return
			/*
			for(var i=id;i>2;i--){
				const e = nodeList[i]
				const isHead = e.classList.contains('bus-member-head')
				if(isHead){
					const head = e.children[0]
					const row = head.rowSpan - 1
					head.rowSpan = row
					tr.remove()
					return
				}
			}*/
		}
	})
		//Side: Save Function
	document.getElementById('save-btn').addEventListener('click',()=>{
		uxSave()
	})

}
const busInit = async(test) =>{
	const hasBuild = await busBuild(test)
	if(hasBuild){
		busFunc()
	}
}