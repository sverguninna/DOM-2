import { renderList , } from "./render.js"
import { getDateNow, getSafeHtmlString, clearForm, delay } from "../helper/helpers.js"
import { data } from "../constans/data.js"
import { postComment } from "../APİ/Requests.js"
import { renderLogin, renderRegistration } from "./authorization.js"



const addFormButton = document.querySelector('.add-form-button')
const inputName = document.querySelector('.add-form-name')
const inputText = document.querySelector('.add-form-text')
const form = document.querySelector('.add-form')
const formLoader = document.querySelector('.form-loader')


function pushComment() {

    if (inputName.value !== '' && inputText.value !== '') {
        let newComment = {
            name: getSafeHtmlString(inputName.value),
            text: inputText.value,
            userNumLike: 0,
            date: getDateNow(),
            id: Math.random(),
            like: false,
        }
        postComment(newComment)
    }
    return
}

function updateEvent() {
    document.querySelectorAll('.like-button')
        .forEach((like) => like.addEventListener('click', addLike))
    document.querySelectorAll('.comment')
        .forEach((comment) => comment.addEventListener('click', responseСomment))
}

function responseСomment(e) {

    let id = Number(e.target.dataset.id)
    console.log(id);
    data.userComments.forEach((comment) => {
        if (comment.id === id) {
            inputText.value = `Oтвет пользователю ${comment.name}, ${comment.text}.`
        }
    })
}

function addLike(e) {
    e.stopPropagation()
    let id = +e.target.id
    
    console.log(data.userComments, id)

    let newValue = data.userComments.map((comment) => {
        if (comment.id === id && !comment.like) {
            return { ...comment, like: !comment.like, userNumLike: comment.userNumLike + 1 }
        } else if (comment.id === id && comment.like) {
            return { ...comment, like: !comment.like, userNumLike: comment.userNumLike - 1 }
        } else {
            return comment
        }
    })
    console.log(newValue);
    data.setUserComments(newValue)

   
    renderList()
 
}


  addFormButton.addEventListener('click', pushComment)  





export { updateEvent, form, formLoader, inputName, inputText, }

// Операторы легко отличить. Когда синтаксис ... используется для «распаковки» элементов массива
// или объекта в отдельные аргументы — это spread.
// А если три точки используются для сбора оставшихся аргументов в массив или объект — это оператор rest.

/* let arr = [1,2,3]

let newArr = [...arr] // spred
let [a, ...b] = arr // rest  */