const memBuild = async() =>{
	const mail = await Postman('member')
	const updateDiv = document.getElementById('main-display')
	
	const output = new Promise((resolve)=>{
		updateDiv.innerHTML = mail
		resolve(true)
	})
	return output
}
const memLoad = async()=>{
	const mail = await Postman('member','load')
	const rowHeader = mail['rowHeader']
	const colLen = rowHeader.length + 1
	const main = document.getElementById('member-main')
	const content = main.innerHTML
	//Header rendering
	const memHeaderCreate = ()=>{
		const headerRow = `<th class='member-header-row'></th>`
		let headerContent = ''
		for(var i=0;i<rowHeader.length;i++){
			const h = rowHeader[i]
			headerContent = headerContent + `<th class='member-header'>` + h + `</th>`
		}
		return headerContent
	}
	const output = new Promise((resolve)=>{		
		const memHeader = memHeaderCreate()
		console.log(memHeader)
		resolve(true)
	})
	return output
}
const memStyle = ()=>{
	
}
const memInit = async() =>{
	const hasBuild = await memBuild()
	if(hasBuild){
		const hasLoad = await memLoad()
	}
	
	memStyle()
}