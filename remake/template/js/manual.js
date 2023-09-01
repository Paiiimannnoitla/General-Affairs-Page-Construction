
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
	console.log(100)
}
// Initialize
const mnlInit = async(t)=>{
	const hasBuild = await mnlBuild(t)
	if(hasBuild){
		mnlFunc()
	}
}