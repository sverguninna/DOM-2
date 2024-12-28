function getSafeHtmlString(comment) {
    return comment.replaceAll('<','&lt').replaceAll('>','&gt')
}

function clearForm(name, text){
    name.value =''
    text.value = ''
}


function getDateNow(params) {
    let date = new Date()
    return `${date.getDate()}:${date.getMonth() + 1}:${date.getFullYear()}`
}

function getTimeNow(){
    let date = new Date()
    return`${date.getHours()}:${date.getMinutes()}`
}

export {getSafeHtmlString, clearForm, getDateNow, getTimeNow}