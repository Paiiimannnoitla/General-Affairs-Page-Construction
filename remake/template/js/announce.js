
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
	document.getElementById('anc-main').addEventListener('change',async(event)=>{
		const e = event.target
		const isUpload = e.classList.contains('upload-btn')
		if(isUpload){
			if(e.files.length){
				const td = e.parentNode
				const content = `<br><input class='edit-mode upload-btn' type='file'>`
				td.insertAdjacentHTML('beforeend',content)
			}
		}			
		//const f = document.getElementById('testupload')
		//console.log(event.target)
		//const cargo = await pack(f.files,'announce')
		//upload(cargo)
	})
}
const ancInit = async()=>{
	const hasBuild = await ancBuild()
	if(hasBuild){
		ancFunc()
		ancStyle()
	}
}