
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
		console.log('cancel')
	})
	//Side: Publish new announcement
	document.getElementById('new-btn').addEventListener('click',()=>{
		const content = `		<tr>
			<td contenteditable='true'>Date</td>
			<td contenteditable='true'>Announcement</td>
			<td>Attactchment:<input id='testupload' type='file'></input></td>
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
	document.getElementById('send-btn').addEventListener('click',async(event)=>{
		const f = document.getElementById('testupload')
		//console.log(event.target)
		const a = await pack(f.files)
		upload(a)
	})
}
const ancInit = async()=>{
	const hasBuild = await ancBuild()
	if(hasBuild){
		ancFunc()
		ancStyle()
	}
}