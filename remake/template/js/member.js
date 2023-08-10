
const memBuild = async() =>{
	/*
	const mail = await Postman('member')
	const updateDiv = document.getElementById('main-display')
	
	const output = new Promise((resolve)=>{
		updateDiv.innerHTML = mail
		resolve(true)
	})
	return output*/
	const isRendered = await Render('member')
	if(isRendered){
		const output = new Promise((resolve)=>{
			resolve(true)
		})
		return output
	}
}

const memStyle = ()=>{
	const output = new Promise((resolve)=>{
		const main = document.getElementById('member-main')
		main.addEventListener('mousedown',()=>{
			const selected = uxSelect()
			if(selected){
				const isSame = selected == event.target.closest('td')
				if(!isSame){
					const isHeader = selected.tagName == 'TH'
					if(isHeader){
						selected.style.background = `beige`
					}else{
						selected.style.background = `azure`
					}
				}
			}
		})
		main.addEventListener('click',()=>{
			const selected = uxSelect()
			if(selected){
				const isSame = selected == event.target.closest('td')
				const isHeader = selected.tagName == 'TH'
				if(isHeader){
					selected.style.background = `rgb(235,235,214)`
				}else{
					selected.style.background = `rgb(209,255,255)`
				}
			}
		})
		resolve(true)
	})
	return output
}
const memFunc = ()=>{
	uxLoginCheck()
	const main = document.getElementById('member-main')
	//Main: Edit Function
		//Side: Append new row
	document.getElementById('append-btn').addEventListener('click',(event)=>{		
		const title = document.getElementById('member-title')
		const colLen = title.colSpan
		let data = main.innerHTML
		const content =`
		<tr>
			<th contenteditable='true'>Title</th>
			<td contenteditable='true' colspan=`+colLen+`>
				<p>Content</p>
			</td>
		</tr>`
		data=data+content
		main.innerHTML=data
	})
		//Side: Save function
	document.getElementById('save-btn').addEventListener('click',(event)=>{
		const evt = new Event('click')
		const btn = document.getElementById('unedit-btn')
		btn.dispatchEvent(evt)
		Delivery('member')
	})
	
		//Side: Unselect function
	document.getElementById('unedit-btn').addEventListener('click',()=>{
		const btnArr = document.querySelectorAll('td,th')
		for(var i=0;i<btnArr.length;i++){
			const e = btnArr[i]
			e.removeAttribute('contenteditable')
		}
	})

		//Side: Content edit 
	document.getElementById('edit-btn').addEventListener('click',()=>{
		const btnArr = document.querySelectorAll('td,th')
		for(var i=0;i<btnArr.length;i++){
			const e = btnArr[i]
			e.contentEditable = 'true'
		}
	})

}
const memInit = async() =>{
	const hasBuild = await memBuild()
	if(hasBuild){
		//const hasLoad = await memLoad()
		const hasStyle = await memStyle()
		if(hasStyle){
			const hasFunc = await memFunc()
		}
	}
}