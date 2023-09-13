
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
	//Side: File input append
	document.getElementById('anc-main').addEventListener('change',(event)=>{
		const e = event.target
		const isUpload = e.classList.contains('upload-btn')
		if(isUpload){
			if(e.files.length){
				const td = e.parentNode
				const btn = td.querySelector('.send-btn')
				if(btn){
					btn.remove()
				}
				const content = `
					<br class='edit-mode'><input class='edit-mode upload-btn' type='file'>
					<p class='send-btn edit-mode'>Upload</p>`
				td.insertAdjacentHTML('beforeend',content)
			}
		}	
	})
	//Side: Uploading preparation
	document.getElementById('anc-main').addEventListener('click',async(event)=>{
		const e = event.target
		const isUpload = e.classList.contains('send-btn')
		if(isUpload){
			const td = e.parentNode
			td.classList.add('upload-zone')
			const brArr = td.querySelectorAll('br')
			for(var i=0;i<brArr.length;i++){
				brArr[i].remove()
			}
		}

	})
	//Side: Main uploading Function
	document.getElementById('function-menu').addEventListener('click',async(event)=>{
		const isSave = event.target.id == 'save-btn'
		if(isSave){
			const uploadArr = document.querySelectorAll('.upload-zone')
			console.log(uploadArr)
			for(var i=0;i<uploadArr.length;i++){
				
				const td = uploadArr[i]
				console.log(td)
				const tr = td.parentNode
				const id = tr.children[0].innerHTML
				const receipt = await uxUpload('announce',td,id)
				let content = ''
				for(var j=0;j<receipt.length;j++){
					const r = receipt[j]
					const arr = r.split('/')
					const name = arr[arr.length-1]
					const url = `<p id='` + r + `' class='dl-link select-item'>` + name + `</p>`
					content = content + url
				}
				const uploadPart = `
					<br class='edit-mode'><input class='edit-mode upload-btn' type='file'>
					<p class='send-btn edit-mode'>Upload</p>`
				content = content + uploadPart
				td.innerHTML = content
			}
			uxSave()
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