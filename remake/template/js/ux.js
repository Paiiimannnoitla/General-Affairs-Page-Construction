let isLogin = false
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
	})
}
const uxSelect = ()=>{
	
	const mode = []
	mode['member'] = (event)=>{
		const isBelow = event.target.id == 'member'
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
				const selected = document.querySelector('.mem-selected')
				console.log(x)
				console.log(y)
				//Select
				if(isHeader){
					cell.style.background = `rgb(235,235,214)`
				}else{
					cell.style.background = `rgb(209,255,255)`
				}
				cell.classList.add('mem-selected')
				cell.contentEditable = 'true'
				//Un-select
				if(selected){
					const isSame = selected == cell
					if(!isSame){
						const isSelHeader = selected.tagName == 'TH'
						if(isSelHeader){
							selected.style.background = `beige`
						}else{
							selected.style.background = `azure`
						}
						selected.classList.remove('mem-selected')
						selected.removeAttribute('contenteditable')
					}			
				}				
			}
		//})
		}
	}
	// Selection Init
	document.getElementById('main-display').addEventListener('click',(event)=>{
		const functionArea = event.target.closest('.function-area')
		if(functionArea){
			mode[functionArea.id](event)
		}
	})
}
const uxInit = ()=>{
	uxLogin()
	uxSelect()
	//uxEdit()
}
uxInit()