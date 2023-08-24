
// Rendering
const ancBuild = async()=>{
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
	document.getElementById('unedit-btn').addEventListener('click',()=>{
		const cellArr = document.querySelectorAll('td,th')
		for(var i=0;i<cellArr.length;i++){
			const e = cellArr[i]
			e.removeAttribute('contenteditable')
		}
	})
	//Side: Publish new announcement
	document.getElementById('new-btn').addEventListener('click',()=>{
		const content = `		<tr>
			<td contenteditable='true'>Date</td>
			<td contenteditable='true'>Announcement</td>
			<td><input class='edit-mode upload-btn' type='file'></td>
		</tr>`
		const main = document.getElementById('anc-main')
		const data = main.innerHTML
		main.innerHTML = data + content
	})
	//Side: Content Edit
	document.getElementById('edit-btn').addEventListener('click',()=>{
		const btnArr = document.querySelectorAll('td:not(.edit-off),th:not(.edit-off)')
		for(var i=0;i<btnArr.length;i++){
			const e = btnArr[i]
			e.contentEditable = 'true'
		}
	})
	//Side; Upload and auto increment
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
					<br><input class='edit-mode upload-btn' type='file'>
					<p class='send-btn'>Upload</p>`
				td.insertAdjacentHTML('beforeend',content)
			}
		}	
	})
	document.getElementById('anc-main').addEventListener('click',async(event)=>{
		const e = event.target
		const isUpload = event.target.classList.contains('send-btn')
		if(isUpload){
			const td = e.parentNode
			const fileArr = td.querySelectorAll('.upload-btn')
			const receipt = []
			for(var i=0;i<fileArr.length;i++){
				const f = fileArr[i].files
				if(f.length){
					const cargo = await pack(f,'announce')
					receipt[i] = await upload(cargo)
				}			
			}
			console.log(receipt)
			let content = ''
			for(var i=0;i<receipt.length;i++){
				const r = receipt[i]
				const arr = r.split('/')
				const name = arr[arr.length-1]
				const url = `<p id='` + r + `' class='read-mode hide'>` + name + `</p>`
				content = content + url
			}
			console.log(content)
			td.innerHTML = content
		}
	})
}
const ancInit = async()=>{
	const hasBuild = await ancBuild()
	if(hasBuild){
		ancFunc()
		ancStyle()
	}
}