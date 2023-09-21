
const sopBuild = async(test) =>{
	if(test){
		return true
	}
	const isRendered = await Render('sop')
	if(isRendered){
		const output = new Promise((resolve)=>{
			resolve(true)
		})
		return output
	}
}

const sopRender = (id)=>{
	
}
const sopFunc = ()=>{
	uxLoginCheck()
	const main = document.getElementById('sop-main')
	//Main: Edit Function
		//Side: Content edit 
	document.getElementById('edit-btn').addEventListener('click',()=>{
		const btnArr = document.querySelectorAll('td,th')
		for(var i=0;i<btnArr.length;i++){
			const e = btnArr[i]
			e.contentEditable = 'true'
		}
	})
	// SOP content loader
	document.getElementById('main-display').addEventListener('click',async(event)=>{
		const isHead = event.target.tagName == 'TH'
		if(isHead){
			const html = await load('sop',[1])
			const thead = event.target.closest('thead')
			const tbody = thead.nextElementSibling
			tbody.innerHTML = html
		}
		
	})
		//Side: Save Function
	document.getElementById('save-btn').addEventListener('click',()=>{
		uxSave()
	})

}
const sopInit = async(test) =>{
	const hasBuild = await sopBuild(test)
	if(hasBuild){
		sopFunc()
	}
}