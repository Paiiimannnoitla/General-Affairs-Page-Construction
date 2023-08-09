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
