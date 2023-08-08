let isLogin = false
const uxLoginCheck = ()=>{
	if(isLogin){
		const btnArr = document.querySelectorAll('.login-mode')
		console.log(btnArr)
		for(var i=0;i<btnArr.length;i++){
			const btn = btnArr[i]
			btn.classList.remove('hide')
		}
	}
}
const uxLogin = ()=>{
	document.getElementById('login-btn').addEventListener('click',(event)=>{
		isLogin = true
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