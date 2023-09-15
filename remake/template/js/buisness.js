
const busBuild = async(test) =>{
	if(test){
		return true
	}
	const isRendered = await Render('business')
	if(isRendered){
		const output = new Promise((resolve)=>{
			resolve(true)
		})
		return output
	}
}

const busFunc = ()=>{
	uxLoginCheck()
	const main = document.getElementById('bus-main')
	//Main: Edit Function
		//Side: Append new row
	document.getElementById('new-btn').addEventListener('click',(event)=>{		
		
	})	
		//Side: Content edit 
	document.getElementById('edit-btn').addEventListener('click',()=>{
		const btnArr = document.querySelectorAll('td,th')
		for(var i=0;i<btnArr.length;i++){
			const e = btnArr[i]
			e.contentEditable = 'true'
		}
	})
		//Side: Save Function
	document.getElementById('save-btn').addEventListener('click',()=>{
		uxSave()
	})

}
const busInit = async(test) =>{
	const hasBuild = await busBuild(test)
	if(hasBuild){
		busFunc()
	}
}