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
	const main = document.getElementById('main-display')
	main.addEventListener('click',(event)=>{
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
			const testbtn = document.getElementById('test-btn')
			const isTest = testbtn.classList.contains('hide')
			if(isTest){
				const testpage = document.getElementById('tb-test')
				testpage.click()
			}else{
				const funcArea = main.querySelectorAll('.function-area')[0].id
				const toolbar = document.getElementById('tb-' + funcArea)
				toolbar.click()
			}
			/*
			const funcArea = main.querySelectorAll('.function-area')[0].id
			const toolbar = document.getElementById('tb-' + funcArea)
			toolbar.click()*/
		}
	})
}

// Quit edit mode
const uxCancel = ()=>{
	const editArr = document.querySelectorAll('td,th')
	for(var i=0;i<editArr.length;i++){
		editArr[i].removeAttribute('contenteditable')
	}
	const uploadArr = document.querySelectorAll('.upload-zone')
	for(var i=0;i<uploadArr.length;i++){
		uploadArr[i].classList.remove('upload-zone')
	}
	const selectArr = document.querySelectorAll('.selected')
	for(var i=0;i<selectArr.length;i++){
		bright(false)
		selectArr[i].classList.remove('selected')
	}
	const itemArr = document.querySelectorAll('.item-selected')
	for(var i=0;i<itemArr.length;i++){
		itemArr[i].classList.remove('item-selected')
	}
	const editmodeArr = document.querySelectorAll('.edit-mode')
	const readArr = document.querySelectorAll('.read-mode')
	hide(editmodeArr)
	unhide(readArr)
	
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
	const editbtnArr = document.querySelectorAll('.edit-mode')
	hide(editbtnArr)
	if(isLogin){
		const btnArr = document.querySelectorAll('.login-mode')
		unhide(btnArr)
	}else{
		const loginbtnArr = document.querySelectorAll('.login-mode')
		const editbtnArr = document.querySelectorAll('.edit-mode')
		hide(loginbtnArr)
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
	// Append new upload button
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
	// Generate temporary downloadl link
	document.getElementById('main-display').addEventListener('click',(event)=>{
		const e = event.target
		const isUpload = e.classList.contains('send-btn')
		if(isUpload){
			const cell = e.parentNode
			const fileArr = cell.querySelectorAll('.upload-btn')
			let content = ''
			const nullArr = []
			let n = 0
			for(var i=0;i<fileArr.length;i++){
				const f = fileArr[i].files
				if(f.length){
					const name = f[0].name
					const url = `<p id="` + name +`" class='anc-link-temp dl-link select-item'>` + name + `</p>`
					content = content + url
				}else{
					nullArr[n] = fileArr[i]
					n = n + 1
				}
			}
			nullArr.reverse()
			for(var i=1;i<nullArr.length;i++){
				const f = nullArr[i]
				f.remove()
			}
			const linkArr = cell.querySelectorAll('.dl-link')
			for(var i=0;i<linkArr.length;i++){
				linkArr[i].remove()
			}
			cell.insertAdjacentHTML('afterbegin',content)
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
		}else{
			fileArr[i].remove()
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
// Save Writer
const uxSaveWriter = async(funcArea)=>{
	const promiseArr = []
	const uploadArr = document.querySelectorAll('.upload-zone')
	let nameCode
	const varArr = {
		'announce':	()=>{nameCode=0},
		'manual':	()=>{nameCode=1}
	}
	const nameMode = [
		main = (arr)=>{return arr[arr.length-1]},
		date = ()=>{return extDate(true,'.')}
	]
	if(uploadArr.length){
		varArr[funcArea]()
	}
	
	for(var i=0;i<uploadArr.length;i++){
		const f = uploadArr[i]
		const tr = f.parentNode
		const id = tr.children[0].innerHTML
		const receipt = await uxUpload(funcArea,f,id)
		let content = ''
		for(var j=0;j<receipt.length;j++){
			const r = receipt[j]
			const arr = r.split('/')
			const name = nameMode[nameCode](arr)
			const url = `<p id='` + r + `' class='dl-link select-item'>` + name + `</p>`
			content = content + url
		}
		const uploadPart = `
			<br class='edit-mode'><input class='edit-mode upload-btn' type='file'>
			<p class='send-btn edit-mode'>Upload</p>`
		content = content + uploadPart
		f.innerHTML = content
	}
	return true
}
// Save function 
const uxSave = ()=>{
	document.getElementById('main-display').addEventListener('click',async(event)=>{
		const savebtn = event.target.id == 'save-btn'
		if(savebtn){
			const editbtn = document.getElementById('edit-btn')
			const main = document.getElementById('main-display')
			const funcArea = main.querySelectorAll('.function-area')[0].id
			const testbtn = document.getElementById('test-btn')
			const isTest = testbtn.classList.contains('hide')
			const isReady = await uxSaveWriter(funcArea)
			if(isReady){
				uxCancel()
				if(isTest){
					console.log('test page save')
					Delivery(funcArea + '-test')
				}else{				
					console.log('Current page saved')
					Delivery(funcArea)			
				}	
				unhide(editbtn)
			}	
		}		
	})
}
const uxStyle = ()=>{

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