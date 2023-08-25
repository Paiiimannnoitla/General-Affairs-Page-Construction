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
// Edit mode
const uxEdit = ()=>{
	document.getElementById('main-display').addEventListener('click',()=>{
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
			unhide(readArr)
			unhide(editbtn)			
			hide(btnArr)		
			bright(false)
			if(selected){
				selected.classList.remove('selected')
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
			const id = document.querySelector('.function-area').id
			btn.click()
			Delivery(id)
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
		uneditbtn.click()
	})
}
// Selection mode
const uxSelectInit = ()=>{	
	// Selection Init
	document.getElementById('main-display').addEventListener('mouseup',(event)=>{
		const functionArea = event.target.closest('.function-area')
		if(functionArea){
			//mode[functionArea.id](event)
			const isBelow = event.target.classList.contains('function-area')
			if(!isBelow){
				
				let cell = event.target
				const isHeader = cell.tagName == 'TH'
				if(!isHeader){
					cell = event.target.closest('td')
				}
				//const isCell = cell.tagName == 'TD' || 'TH'
				const cellArr = []
				cellArr[0] = cell.tagName == 'TD'
				cellArr[1] = cell.tagName == 'TH'
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
	uxEdit()
	uxSave()
	uxSelectInit()
	uxStyle()
}
uxInit()