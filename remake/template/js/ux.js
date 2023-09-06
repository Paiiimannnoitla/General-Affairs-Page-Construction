let isLogin = false
// Return Login and Edit mode status information
const uxCheck = ()=>{
	if(isLogin){
		const isEdit = document.getElementById('unedit-btn').classList.contains('hide')
		if(isEdit){
			return 'Login'
		}else{
			return 'Edit'
		}
	}else{
		return false
	}	
}
// Move Function
const uxMove = ()=>{
	document.getElementById('main-display').addEventListener('click',(event)=>{
		// Move to the top
		const isTop = event.target.id == 'movetop-btn'
		const table = document.querySelector('table')
		if(isTop){
			table.scrollTo(0,0)
		}
		// Move to the bottom
		const isBottom = event.target.id == 'movebottom-btn'
		if(isBottom){
			table.scrollTo(0,table.scrollHeight)
		}
	})
}
// Edit mode
const uxEdit = ()=>{
	document.getElementById('main-display').addEventListener('click',(event)=>{
		const isEdit = event.target.id == 'edit-btn'
		if(isEdit){
			const editbtn = document.getElementById('edit-btn')
			const btnArr = document.querySelectorAll('.edit-mode')
			const readArr = document.querySelectorAll('.read-mode')
			hide(readArr)
			hide(editbtn)
			unhide(btnArr)	
		}
		const isUnEdit = event.target.id == 'unedit-btn'
		if(isUnEdit){
			const editbtn = document.getElementById('edit-btn')
			const btnArr = document.querySelectorAll('.edit-mode')
			const readArr = document.querySelectorAll('.read-mode')
			const selected = uxSelect()
			const selecteditem = document.querySelectorAll('.item-selected')
			unhide(readArr)
			unhide(editbtn)			
			hide(btnArr)		
			bright(false)
			if(selected){
				selected.classList.remove('selected')
			}	
			if(selecteditem.length){
				console.log(200)
				selecteditem[0].classList.remove('item-selected')
			}
		}
	})
}
// Save function 
const uxSave = ()=>{
	document.getElementById('main-display').addEventListener('click',(event)=>{
		const savebtn = event.target.id == 'save-btn'
		if(savebtn){
			const evt = new Event('click')
			const btn = document.getElementById('unedit-btn')
			const main = document.getElementById('main-display')
			const id = main.querySelectorAll('.function-area')[0].id
			btn.click()
			const testbtn = document.getElementById('test-btn')
			const isTest = testbtn.classList.contains('hide')
			if(isTest){
				console.log('test page save')
				Delivery(id + '-test')
			}else{
				
				console.log('Current page saved')
				Delivery(id)
			}		
		}		
	})
}
// Delete function
const uxDelete = ()=>{
	document.getElementById('main-display').addEventListener('click',(event)=>{
		const delbtn = event.target.id == 'delete-btn'
		if(delbtn){
			const selected = uxSelect()
			const tr = selected.closest('tr')
			tr.remove()
		}
	})
}
// Remain Login status
const uxLoginCheck = ()=>{
	if(isLogin){
		const btnArr = document.querySelectorAll('.login-mode')
		unhide(btnArr)
	}else{
		const loginbtnArr = document.querySelectorAll('.login-mode')
		const editbtnArr = document.querySelectorAll('.edit-mode')
		hide(loginbtnArr)
		console.log(loginbtnArr)
		hide(editbtnArr)
	}
}
// Login mode
const uxLogin = ()=>{
	const loginbtn = document.getElementById('login-btn')
	const logoutbtn = document.getElementById('logout-btn')
	
	loginbtn.addEventListener('click',(event)=>{
		isLogin = true
		hide(loginbtn)
		unhide(logoutbtn)
		uxLoginCheck()
	})
	logoutbtn.addEventListener('click',(event)=>{
		isLogin = false
		unhide(loginbtn)
		hide(logoutbtn)
		uxLoginCheck()
		const uneditbtn = document.getElementById('unedit-btn')
		if(uneditbtn){
			uneditbtn.click()
		}		
	})
}
// Test mode
const uxTest = ()=>{
	const testbtn = document.getElementById('test-btn')
	const testoff = document.getElementById('testoff-btn')
	
	testbtn.addEventListener('click',()=>{
		const loginbtn = document.getElementById('login-btn')
		loginbtn.click()
		const testArr = document.querySelectorAll('.test-mode')
		for(var i=0;i<testArr.length;i++){
			const e = testArr[i]
			e.classList.remove('hide')
		}
		testbtn.classList.add('hide')
	})
	
	testoff.addEventListener('click',()=>{	
		const testArr = document.querySelectorAll('.test-mode')
		for(var i=0;i<testArr.length;i++){
			const e = testArr[i]
			e.classList.add('hide')
		}
		testbtn.classList.remove('hide')
	})
	
}
// Selection mode
const uxSelectInit = ()=>{	
	// Selection Init
	document.getElementById('main-display').addEventListener('mouseup',(event)=>{
		const functionArea = event.target.closest('.function-area')
		if(functionArea){
			const isBelow = event.target.classList.contains('function-area')
			if(!isBelow){				
				let cell = event.target
				const isHeader = cell.tagName == 'TH'
				if(!isHeader){
					cell = event.target.closest('td')
				}
				const cellArr = [] 
				if(cell){
					cellArr[0] = cell.tagName == 'TD'
					cellArr[1] = cell.tagName == 'TH'
				}				
				//cellArr[2] = event.target.classList.contains('select-item')
				let isCell = 0
				for(var i=0;i<cellArr.length;i++){
					isCell = isCell + cellArr[i]
				}
				if(isCell){
					/*
					const tr = cell.closest('tr')
					const x = cell.cellIndex
					const y = tr.rowIndex
					*/
					const selected = document.querySelector('.selected')
					bright(false)
					cell.classList.add('selected')					
					if(selected){
						selected.classList.remove('selected')
					}	
					bright()
				}
				// Option select
				const itemArr = []
				itemArr[0] = event.target.classList.contains('select-item')
				let isItem = 0
				for(var i=0;i<itemArr.length;i++){
					isItem = isItem + itemArr[i]
				}
				if(isItem){
					const selected = document.querySelector('.item-selected')
					event.target.classList.add('item-selected')
					if(selected){
						selected.classList.remove('item-selected')
					}
				}
			}
		}
	})
}
// Select function
const uxSelect = (cell=true)=>{
	const id = document.querySelector('.function-area').id
	
	let selected = document.querySelectorAll('.selected')
	if(selected.length){
		if(selected.length==1){
			return selected[0]
		}else{
			if(cell){
				return selected
			}else{
				selected = document.querySelectorAll('.item-selected')
				if(selected.length){
					return selected				
				}

			}			
		}
	}else{
		return false
	}
}
// Upload Button Setting
const uxUploadSet = ()=>{
	document.getElementById('main-display').addEventListener('change',(event)=>{
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
					<br class='edit-mode'><input class='edit-mode upload-btn' type='file'>
					<p class='send-btn edit-mode'>Upload</p>`
				td.insertAdjacentHTML('beforeend',content)
			}
		}	
	})
}
// Upload function
const uxUpload = async(funcArea,uploadArea,id,isClear=true)=>{
	const fileArr = uploadArea.querySelectorAll('.upload-btn')
	const receipt = []
	let n = 1
	if(isClear){
		n = 0
	}
	let a = 0
	for(var i=0;i<fileArr.length;i++){
		const f = fileArr[i].files
		if(f.length){
			const cargo = await pack(f,funcArea,id,n)
			receipt[a] = await upload(cargo)
			a = a + 1
			n = n + 1
		}
	}
	return receipt
}
// Download function
const uxDownload = ()=>{
	document.getElementById('main-display').addEventListener('click',async(event)=>{
		const e = event.target
		const isLink = event.target.classList.contains('dl-link')
		if(isLink){
			const isEdit = uxCheck() == 'Login'
			if(isEdit){
				const href = window.location.href + 'download/'
				const dlurl = e.id
				const url = href + dlurl 
				const name = e.innerHTML
				download(url,name)
			}		
		}
	})
}
const uxStyle = ()=>{
	/*
	const main = document.getElementById('main-display')
	main.addEventListener('mousedown',()=>{
		bright(false)
	})
	main.addEventListener('click',()=>{
		bright()
	})*/
}
const uxInit = ()=>{
	uxLogin()
	uxMove()
	uxEdit()
	uxSave()
	uxDelete()
	uxTest()
	uxSelectInit()
	uxUploadSet()
	uxDownload()
	uxStyle()
}
uxInit()