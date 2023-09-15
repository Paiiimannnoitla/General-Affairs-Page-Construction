
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
	document.getElementById('edit-btn').addEventListener('click',()=>{
		const btnArr = document.querySelectorAll('td:not(.edit-off),th:not(.edit-off)')
		for(var i=0;i<btnArr.length;i++){
			const e = btnArr[i]
			e.contentEditable = 'true'
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