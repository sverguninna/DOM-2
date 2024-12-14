const addFormButton = document.querySelector('.add-form-button')
const commentsList = document.querySelector('.comments')
const inputName = document.querySelector('.add-form-name')
const inputText = document.querySelector('.add-form-text')




let userComments = [
    {
        userName: 'Глеб Фокин',
        userComment: ' Это будет первый комментарий на этой странице',
        userNumLike: 3  ,
        date: '12.02.22 ', 
        time: '12:18',
        id: 0,
        like: false,
    },
    {
        userName: 'Nika',
        userComment: 'hello',
        userNumLike:0,
        date: '21:7:2024', 
        time: '11:30',
        id : 1,
        like: false,
    }
];
addFormButton.addEventListener('click', pushComment)

renderList()

function renderList(e) {
  commentsList.innerHTML = ''
  userComments.map((comment)=>
  commentsList.innerHTML+=` <li class="comment"  data-id="${comment.id}">
          <div class="comment-header">
            <div>${comment.userName} </div>
            <div>${comment.date} ${comment.time} </div>
          </div>
          <div class="comment-body">
            <div class="comment-text">
            ${comment.userComment}
            </div>
          </div>
          <div class="comment-footer">
            <div class="likes">
              <span class='likes-counter'>${comment.userNumLike}</span>
              <button class='like-button ${comment.like ? 'like-button_active-like' : ''}'  data-id="${comment.id}"></button>
            </div>
          </div>
        </li>`  
)
updateEvent()
}

function getDateNow(params) {
    let date = new Date()
    return `${date.getDate()}:${date.getMonth() + 1}:${date.getFullYear()}`
}

function getTimeNow(){
    let date = new Date()
    return`${date.getHours()}:${date.getMinutes()}`
}
function checkingСomments( comment) {
 commentChecking = comment.replaceAll('<','&lt').replaceAll('>','&gt')
  return commentChecking
}
function clearForm(){
    inputName.value =''
    inputText.value = ''
}

function pushComment() {
    if (inputName.value !== '' && inputText.value !=='') {
        userComments.push({
        userName: inputName.value,
        userComment: checkingСomments(inputText.value),
        userNumLike: 0,
        date: getDateNow(), 
        time: getTimeNow(),
        id: Math.random(),
        like: false,
        })
        renderList()
        clearForm()
    }
   return
}

function updateEvent() {
     document.querySelectorAll('.like-button')
    .forEach((like)=> like.addEventListener('click', addLike))
    document.querySelectorAll('.comment')
    .forEach((comment)=> comment.addEventListener('click', responseСomment))
}

function responseСomment(e) {
    let id = Number(e.target.dataset.id)
    console.log(id);
    userComments.forEach((comment)=>{
        if (comment.id === id ) {
           inputText.value = `Oтвет пользователю ${comment.userName}, ${comment.userComment}.` 
        } 
    })
}

function addLike(e) {
    let id = Number(e.target.dataset.id)
   console.log(id);
    userComments = userComments.map((comment)=>{
        if (comment.id === id && !comment.like) {
            return {...comment, like: !comment.like, userNumLike: comment.userNumLike + 1}
        } else if (comment.id === id && comment.like){
            return {...comment, like: !comment.like, userNumLike: comment.userNumLike - 1}
        } else {
            return comment
        }
    })
    
    renderList()
}

// Операторы легко отличить. Когда синтаксис ... используется для «распаковки» элементов массива 
// или объекта в отдельные аргументы — это spread. 
// А если три точки используются для сбора оставшихся аргументов в массив или объект — это оператор rest.

/* let arr = [1,2,3]

let newArr = [...arr] // spred
let [a, ...b] = arr // rest  */