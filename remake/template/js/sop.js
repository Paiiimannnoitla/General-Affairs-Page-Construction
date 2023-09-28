
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
	uxCancel(false)
	const updateArr = document.querySelectorAll('.updated')
	const receipt = []
	const testbtn = document.getElementById('test-btn')
	const isTest = testbtn.classList.contains('hide')
	const promiseChain = []
	for(var i=0;i<updateArr.length;i++){
		promiseChain[i] = new Promise(async(resolve)=>{
			const u = updateArr[i]
			const tbody = u.children[1]
			const content = tbody.innerHTML
			const sopid = u.children[0].id
			const id = sopid.substring(4)
			let func = 'sop'
			if(isTest){
				func = func + '-test'
			}
			const isSaved = await Delivery(func,id,content)
			if(isSaved){		
				//u.classList.remove('updated')
				resolve(true)
			}
		})		
	}
	const output = await Promise.all(promiseChain)
	return output
}
const sopFunc = ()=>{
	uxLoginCheck()
	const main = document.getElementById('sop-main')
	//Main: Edit Function
		//Side: Content edit 
	document.getElementById('edit-btn').addEventListener('click',()=>{
		const btnArr = document.querySelectorAll('td:not(.edit-off),th:not(.edit-off)')
		for(var i=0;i<btnArr.length;i++){
			const e = btnArr[i]
			e.contentEditable = 'true'
		}
	})
		//Side: SOP content loader
	document.getElementById('sop-main').addEventListener('click',async(event)=>{
		const isHead = event.target.classList.contains('sop-form-header')
		if(isHead){			
			const thead = event.target.closest('thead')
			const table = thead.parentNode.classList.add('updated')
			const id = thead.id.substring(4)
			const html = await load('sop',[id],'sop')
			const tbody = thead.nextElementSibling
			tbody.innerHTML = html		
		}		
	})
		//Side:	Add new step 
	document.getElementById('sop-main').addEventListener('click',(event)=>{
		const isButton = event.target.classList.contains('sop-btn-newstep')
		if(isButton){
			console.log('new step')
		}
	})
		//Side: Save Function
	document.getElementById('save-btn').addEventListener('click',async()=>{
		const isSaved = await sopSave()
		if(isSaved){
			const updateArr = document.querySelectorAll('.updated')
			for(var i=0;i<updateArr.length;i++){
				const u = updateArr[i]
				u.classList.remove('updated')
				u.children[1].innerHTML = ''
			}
			uxSave()
		}
		//uxSave()
	})

}
const sopInit = async(test) =>{
	const hasBuild = await sopBuild(test)
	if(hasBuild){
		sopFunc()
	}
}