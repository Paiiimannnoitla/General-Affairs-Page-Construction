
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
			const prefix = `<tr class='bus-affairs'>`
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