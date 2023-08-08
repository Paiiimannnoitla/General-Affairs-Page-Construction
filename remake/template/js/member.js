const memBuild = async() =>{
	const mail = await Postman('member')
	const updateDiv = document.getElementById('main-display')
	
	const output = new Promise((resolve)=>{
		updateDiv.innerHTML = mail
		resolve(true)
	})
	return output
}
/*
const memLoad = async()=>{
	const mail = await Postman('member','load')
	const rowHeader = mail['rowHeader']
	const colHeader = mail['columnHeader'][0]
	const colLen = rowHeader.length + 1
	const main = document.getElementById('member-main')
	const content = main.innerHTML
	//Title creation
	const memTitleCreate = ()=>{
		const output = `<tr><th colspan=`+ colLen +` id='member-title'>組織成員</th></tr>`
		return output
	}
	//Header creation
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
	//Member name creation
	
	const memNameCreate = ()=>{
		const nameArr = colHeader['成員姓名']
		const title = `<th class='member-header-row'>成員姓名</th>`
		let output = ''
		if(nameArr){
			for(var i=0;i<nameArr.length;i++){
				const arr = nameArr[i]
				if(i==0){
					output = `<td class='member-name'><p class='member-leader-first'>` + arr[0] + `</p></td>`
				}else{
					
					let data = `<td class='member-name'><p class='member-leader-third'>` + arr[i][0] + `</p>`
					for(var j=1;j<arr.length;j++){
						const e = arr[j]
						const member = `<p>` + e + `</p>`
						data = data + member
					}
					
				}
			}
		}else{
			return ''
		}
	}
	const output = new Promise((resolve)=>{	
		const memTitle = memTitleCreate()
		const memHeader = memHeaderCreate()
		//const memName = memNameCreate()
		console.log(memTitle)
		resolve(true)
	})
	return output
}*/
const memStyle = ()=>{
	const output = new Promise((resolve)=>{
		resolve(true)
	})
	return output
}
const memFunc = ()=>{
	uxLoginCheck()
	const main = document.getElementById('member-main')
	document.getElementById('append-btn').addEventListener('click',(event)=>{		
		const title = document.getElementById('member-title')
		const colLen = title.colSpan
		let data = main.innerHTML
		const content =`
		<tr>
			<th>Title</th>
			<td colspan=`+colLen+`>
				<p>Content</p>
			</td>
		</tr>`
		data=data+content
		main.innerHTML=data
	})
	//Save function
	document.getElementById('save-btn').addEventListener('click',(event)=>{
		Delivery('member')
	})
	//Edit mode activation
	document.getElementById('edit-btn').addEventListener('click',(event)=>{
		const btnArr = document.querySelectorAll('.edit-mode')
		unhide(btnArr)
	})
	//Edit Function

}
const memInit = async() =>{
	const hasBuild = await memBuild()
	if(hasBuild){
		//const hasLoad = await memLoad()
		const hasStyle = await memStyle()
		if(hasStyle){
			const hasFunc = await memFunc()
		}
	}
	
	memStyle()
}