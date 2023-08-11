
const memBuild = async() =>{
	const isRendered = await Render('member')
	if(isRendered){
		const output = new Promise((resolve)=>{
			resolve(true)
		})
		return output
	}
}

const memStyle = ()=>{
	const main = document.getElementById('member-main')
	const uneditbtn = document.getElementById('unedit-btn')
	// Revert style setting
	const revert = ()=>{
		const selected = uxSelect()
		if(selected){
			const isSame = selected == event.target.closest('td')
			if(!isSame){
				const isHeader = selected.tagName == 'TH'
				if(isHeader){
					selected.style.background = `rgb(245,245,220)`
				}else{
					selected.style.background = `rgb(240,255,255)`
				}
				//selected.classList.remove('selected')
			}
		}
	}
	main.addEventListener('mousedown',()=>{
		revert()
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
	uneditbtn.addEventListener('click',()=>{
		revert()
	})
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
		memStyle()
		memFunc()
	}
}