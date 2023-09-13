
// Rendering
const mnlBuild = async(t)=>{
	if(t){
		return true
	}
	const isRendered = await Render('manual')
	if(isRendered){
		const output = new Promise((resolve)=>{
			resolve(true)
		})
		return output
	}
}

// Main: Edit Function
const mnlFunc = ()=>{
	uxLoginCheck()
	//Side: Content edit
	document.getElementById('edit-btn').addEventListener('click',()=>{
		const btnArr = document.querySelectorAll('td:not(.edit-off),th:not(.edit-off)')
		for(var i=0;i<btnArr.length;i++){
			const e=btnArr[i]
			e.contentEditable = 'true'
		}
	})
	//Side: Uploading preparation
	document.getElementById('mnl-main').addEventListener('click',async(event)=>{
		const e = event.target
		const isUpload = e.classList.contains('send-btn')
		if(isUpload){
			const td = e.parentNode
			td.classList.add('upload-zone')
		}
	})
	//Side: Main uploading Function
	document.getElementById('function-menu').addEventListener('click',async(event)=>{
		const isSave = event.target.id == 'save-btn'
		if(isSave){
			const uploadArr = document.querySelectorAll('.upload-zone')
		}
	})
}
// Initialize
const mnlInit = async(t)=>{
	const hasBuild = await mnlBuild(t)
	if(hasBuild){
		mnlFunc()
	}
}