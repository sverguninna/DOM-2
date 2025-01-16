import { commentsList } from "../JS/render.js"
import { form } from "../JS/comments.js"

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


function showNotShowLoader (flag, text) {
    if (flag) {
        commentsList.innerHTML = `<li>${text}</li>`
    } else{
        commentsList.innerHTML = text
    }
}

function showNotShowForm (flag) {
    if (flag) {
        form.style.display = 'block'
    } else{
        form.style.display = 'none'
    }
}

function delay(interval = 300) {
    return new Promise((resolve) => {
       setTimeout(() => {
       resolve();
       }, interval);
    });
 }
 

export {getSafeHtmlString, clearForm, getDateNow, getTimeNow, showNotShowLoader, showNotShowForm, delay}