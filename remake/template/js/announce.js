
// Rendering
const ancBuild = async(test)=>{
	if(test){
		return true
	}
	const isRendered = await Render('announce')
		if(isRendered){
			const output = new Promise((resolve)=>{
				resolve(true)
			})
			return output
		}
}
// Style 
const ancStyle = ()=>{
	
}

//Main: Edit function
const ancFunc = ()=>{
	uxLoginCheck()
	//Side: Unselect function
	/*
	document.getElementById('unedit-btn').addEventListener('click',()=>{
		const cellArr = document.querySelectorAll('td,th')
		for(var i=0;i<cellArr.length;i++){
			const e = cellArr[i]
			e.removeAttribute('contenteditable')
		}
		const uploadArr = document.querySelectorAll('.upload-zone')
		for(var i=0;i<uploadArr.length;i++){
			const e = uploadArr[i]
			e.classList.remove('upload-zone')
		}
	})*/
	
	//Side: Publish new announcement
	document.getElementById('new-btn').addEventListener('click',()=>{
		const date = extDate()
		const ancArr = document.querySelectorAll('.anc-unit')
		const last = ancArr[0]
		const lastid = last.children[0].innerHTML
		const id = Number(lastid) + 1
		const content = `		<tr class='anc-unit'>
			<td class='edit-off'>` + id + `</td>
			<td class='edit-off'>` + date + `</td>
			<td contenteditable='true' class='anc-content'>Announcement</td>
			<td class='edit-off'><input class='edit-mode upload-btn' type='file'></td>
		</tr>`
		last.insertAdjacentHTML('beforebegin',content)
		const movebtn = document.getElementById('movetop-btn')
		movebtn.click()		
	})
	//Side: Content Edit
	document.getElementById('edit-btn').addEventListener('click',()=>{
		const btnArr = document.querySelectorAll('td:not(.edit-off),th:not(.edit-off)')
		for(var i=0;i<btnArr.length;i++){
			const e = btnArr[i]
			e.contentEditable = 'true'
		}
	})
	
	//Side: Uploading preparation
	document.getElementById('anc-main').addEventListener('click',async(event)=>{
		const e = event.target
		const isUpload = event.target.classList.contains('send-btn')
		if(isUpload){
			const td = e.parentNode
			console.log(td)
			td.classList.add('upload-zone')
			const brArr = td.querySelectorAll('br')
			for(var i=1;i<brArr.length;i++){
				brArr[i].remove()
			}		
		}
		/*
		const isSave = event.target.classList.contains('save-btn')
		if(isSave){
			console.log(event.target)
			const td = e.parentNode
			const tr = td.parentNode
			const id = tr.children[0].innerHTML
			const receipt = await uxUpload('announce',td,id)
			let content = ''
			for(var i=0;i<receipt.length;i++){
				const r = receipt[i]
				const arr = r.split('/')
				const name = arr[arr.length-1]
				const url = `<p id='` + r + `' class='anc-link dl-link select-item'>` + name + `</p>`
				content = content + url
			}
			const linkArr = td.querySelectorAll('.anc-link')
			for(var i=0;i<linkArr.length;i++){
				linkArr[i].remove()
			}
			td.insertAdjacentHTML('afterbegin',content)
			uxSave()
		}*/
	})
	//Side: Main uploading Function
	document.getElementById('main-display').addEventListener('click',async(event)=>{
		const isSave = event.target.classList.contains('save-btn')
		if(isSave){
			const uploadArr = document.querySelectorAll('.upload-zone')
			for(var i=0;i<uploadArr.length;i++){
				const td = uploadArr[i]
				const tr = td.parentNode
				const id = tr.children[0].innerHTML
				const receipt = await uxUpload('announce',td,id)
				let content = ''
				for(var i=0;i<receipt.length;i++){
					const r = receipt[i]
					const arr = r.split('/')
					const name = arr[arr.length-1]
					const url = `<p id='` + r + `' class='anc-link dl-link select-item'>` + name + `</p>`
					content = content + url
				}
				const linkArr = td.querySelectorAll('.anc-link')
				for(var i=0;i<linkArr.length;i++){
					linkArr[i].remove()
				}
				td.insertAdjacentHTML('afterbegin',content)
			}
		}
	})
}
// Initializer
const ancInit = async(test)=>{
	const hasBuild = await ancBuild(test)
	if(hasBuild){
		ancFunc()
		ancStyle()
	}
}