export function getData(){
    return JSON.parse(localStorage.getItem('goodslist') ||  '[]');
}

export function setData(json){
    let data = getData();
    let hasData = false;
    data.forEach(item => {
        if(item.id == json.id){
            hasData = true;
            item.count += json.count;
        }
    });
    if(!hasData){
        data.push(json)
    }
    localStorage.setItem('goodslist',JSON.stringify(data));
}

export function updateLocalData(id,type){
    let data = getData();
    let index = data.findIndex(function(item){
        return item.id == id;
    });
    data[index].count += type;
    localStorage.setItem('goodslist',JSON.stringify(data));
}

export function delData(id){
    let data = getData();
    let index = data.findIndex(function(item){
        return item.id == id;
    });
    data.splice(index,1);
    localStorage.setItem('goodslist',JSON.stringify(data));
}