const clsCheck = (e,cls)=>{
	const isElement = e instanceof Element
	if(!isElement){
		e = e.target
	}
	const isExist = e.classList.contains(cls)
	return isExist
}
const hide = (arr)=>{
	const isArr = arr.constructor == NodeList
	if(isArr){
		for(var i=0;i<arr.length;i++){
			arr[i].classList.add('hide')
		}
	}else{
		arr.classList.add('hide')
	}
}
const unhide = (arr)=>{
	const isArr = arr.constructor == NodeList
	if(isArr){
		for(var i=0;i<arr.length;i++){
			arr[i].classList.remove('hide')
		}
	}else{
		arr.classList.remove('hide')
	}
}
let prevSelected = ''
const bright = (dark = true)=>{
	let cell = uxSelect()
	if(!dark){
		cell = prevSelected
	}
	const colorCode = window.getComputedStyle(cell)['background']
	const upper = colorCode.indexOf('(') + 1
	const lower = colorCode.indexOf(')')
	const rgb = colorCode.substring(upper,lower).split(',')
	const r = rgb[0]-0
	const g = rgb[1]-0
	const b = rgb[2]-0
	if(cell){
		const ar = 10
		const ag = 10
		const ab = 10
		if(dark){
			const nr = r-ar
			const ng = g-ag
			const nb = b-ab
			const nColorCode = 'rgb(' + nr + ',' + ng + ',' + nb + ')' 
			cell.style.background = nColorCode
			prevSelected = cell
		}else{
			const nr = r+ar
			const ng = g+ag
			const nb = b+ab
			const nColorCode = 'rgb(' + nr + ',' + ng + ',' + nb + ')'
			cell.style.background = nColorCode			
		}
	}
	
}
