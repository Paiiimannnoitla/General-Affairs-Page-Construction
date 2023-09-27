
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
const sopSave = async()=>{
	const updateArr = document.querySelectorAll('.updated')
	const receipt = []
	const testbtn = document.getElementById('test-btn')
	const isTest = testbtn.classList.contains('hide')
	for(var i=0;i<updateArr.length;i++){
		const u = updateArr[i]
		const tbody = u.children[1]
		const content = tbody.innerHTML
		const sopid = u.children[0].id
		const id = sopid.substring(4)
		if(isTest){
			Delivery('sop-test',id,content)
		}else{
			Delivery('sop',id,content)
		}
		
	}
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
		//Side: SOP content loader
	document.getElementById('sop-main').addEventListener('click',async(event)=>{
		const isHead = event.target.tagName == 'TH'
		if(isHead){
			
			const thead = event.target.closest('thead')
			const id = thead.id
			const html = await load('sop',[1],'sop')
			const tbody = thead.nextElementSibling
			tbody.innerHTML = html
			
		}
		
	})
		//Side: Save Function
	document.getElementById('save-btn').addEventListener('click',()=>{
		sopSave()
		//uxSave()
	})

}
const sopInit = async(test) =>{
	const hasBuild = await sopBuild(test)
	if(hasBuild){
		sopFunc()
	}
}