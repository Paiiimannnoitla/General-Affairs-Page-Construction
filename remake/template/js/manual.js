
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
	
	//Side: Content edit
	document.getElementById('edit-btn').addEventListener('click',()=>{
		const btnArr = document.querySelectorAll('td:not(.edit-off),th:not(.edit-off)')
		for(var i=0;i<btnArr.length;i++){
			const e=btnArr[i]
			e.contentEditable = 'true'
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