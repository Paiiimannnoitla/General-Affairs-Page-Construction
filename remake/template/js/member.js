const memLoad = async() =>{
	const mail = await Postman('member')
	console.log(mail)
	const updateDiv = document.getElementById('main-display')
	updateDiv.innerHTML = mail
}
const memInit = () =>{
	memLoad()
}