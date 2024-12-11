const addFormButton = document.querySelector('.add-form-button')
const commentsList = document.querySelector('.comments')
const inputName = document.querySelector('.add-form-name')
const  inputText = document.querySelector('.add-form-text')




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
  commentsList.innerHTML+=` <li class="comment">
          <div class="comment-header">
            <div>${comment.userName} </div>
            <div>${comment.date} ${comment.time} </div>
          </div>
          <div class="comment-body">
            <div class="comment-text">
            ${comment.userName}
            </div>
          </div>
          <div class="comment-footer">
            <div class="likes">
              <span class="likes-counter">${comment.userNumLike}</span>
              <button class="like-button"  data-id="${comment.id}"></button>
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

function clearForm(){
    inputName.value =''
    inputText.value = ''
}

function pushComment() {
    if (inputName.value !== '' && inputText.value !=='') {
        userComments.push({
        userName: inputName.value,
        userComment: inputText.value,
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
}


function addLike(e) {
    let id = Number(e.target.dataset.id) 
    userComments.forEach((comment)=>{
        if (comment.id === id && comment.like === false) {
            comment.like = !comment.like
            comment.userNumLike += 1 
        } else if (comment.id === id && comment.like){
            comment.like = !comment.like
            comment.userNumLike -= 1 
           
        }
    renderList()
    })

}