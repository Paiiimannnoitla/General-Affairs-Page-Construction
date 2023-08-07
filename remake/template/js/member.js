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
	const memTitleCreate = ()=>{
		const output = `<tr><th colspan=`+ colLen +` id='member-title'>組織成員</th></tr>`
		return output
	}
	//Header rendering
	const memHeaderCreate = ()=>{
		const headerRow = `<th class='member-header-row'></th>`
		let headerContent = ''
		for(var i=0;i<rowHeader.length;i++){
			const h = rowHeader[i]
			headerContent = headerContent + `<th class='member-header'>` + h + `</th>`
		}
		const output = `<tr>` + headerContent + `</tr>`
		return output
	}
	const output = new Promise((resolve)=>{	
		const memTitle = memTitleCreate()
		const memHeader = memHeaderCreate()
		console.log(memTitle)
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