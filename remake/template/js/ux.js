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
			hide(editbtn)
			unhide(btnArr)	
		}
		const isUnEdit = event.target.id == 'unedit-btn'
		if(isUnEdit){
			console.log(100)
			const editbtn = document.getElementById('edit-btn')
			const btnArr = document.querySelectorAll('.edit-mode')
			const selected = uxSelect()
			unhide(editbtn)			
			hide(btnArr)		
			bright(false)
			selected.classList.remove('selected')
			
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
				const isCell = cell.tagName == 'TD' || 'TH'
				if(isCell){
					const tr = cell.closest('tr')
					const x = cell.cellIndex
					const y = tr.rowIndex
					const selected = document.querySelector('.selected')
					bright(false)
					cell.classList.add('selected')					
					if(selected){
						selected.classList.remove('selected')
					}	
					bright()
				}
			}
		}
	})
}
// Select function
const uxSelect = ()=>{
	const id = document.querySelector('.function-area').id

	const selected = document.querySelectorAll('.selected')
	if(selected.length){
		if(selected.length==1){
			return selected[0]
		}else{
			return selected
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