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
	
}
const uxInit = ()=>{
	uxLogin()
	uxSelect()
}
uxInit()