let isLogin = false
const uxLoginCheck = ()=>{
	if(isLogin){
		const btnArr = document.querySelectorAll('.login-mode')
		unhide(btnArr)
	}
}
const uxLogin = ()=>{
	const loginbtn = document.getElementById('login-btn')
	const logoutbtn = document.getElementById('logout-btn')
	loginbtn.addEventListener('click',(event)=>{
		isLogin = true
		
		uxLoginCheck()
	})
	logoutbtn.addEventListener('click',(event)=>{
		isLogin = false
		
	})
}
const uxSelect = ()=>{
	
}
const uxInit = ()=>{
	uxLogin()
	uxSelect()
}
uxInit()