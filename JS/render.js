import { updateEvent, form, inputName,} from "./comments.js"
import { data } from "../constans/data.js"
import { getCommentsList,  } from "../APİ/Requests.js" 
import { renderLogin, renderRegistration, authorizationUser, /* usersLocal */} from "./authorization.js"

/* const form = document.querySelector('.add-form') */
const commentsList = document.querySelector('.comments')
const linkAuthorization = document.querySelector('.link-Authorization')
const text = document.querySelector('.text')
const boxText = document.querySelector('.box-text')


getCommentsList()

function renderList() {
   /*  usersLocal = localStorage.getItem() */
    commentsList.innerHTML = ''
    data.userComments.map((comment)=>
    commentsList.innerHTML+= `<li data-id="${comment.id}" class="comment">
            <div class="comment-header">
              <div>${comment.name} </div>
              <div>${comment.date}</div>
            </div>
            <div class="comment-body">
              <div class="comment-text">
              ${comment.text}
              </div>
            </div>
            <div class="comment-footer">
              <div class="likes">
                <span class='likes-counter'>${comment.userNumLike}</span>
                <button class='like-button ${comment.like ? 'like-button_active-like' : ''}' id="${comment.id}"></button>
              </div>
            </div>
          </li>`  
  
  );
  if (authorizationUser.getToken()) {
     boxText.style.display= 'none';
     form.style.display = 'block';
     inputName.value = authorizationUser.getName()
     console.log(form);
  }else{
    boxText.style.display='flex'
    form.style.display ='none'
    
  }  

linkAuthorization.addEventListener('click', (e) => {

  if (e.target.innerHTML === 'Войдите') {
    text.innerHTML = 'Что б зарегистрироваться нажмите '
    e.target.innerHTML = 'Регистрация'
   return renderLogin()
  }
  if (e.target.innerHTML === 'Регистрация') {
   text.innerHTML = 'Что б отправить коментарий'
   e.target.innerHTML = 'Войдите'
   renderRegistration()
 }
}) 
}
updateEvent()



export {renderList, commentsList, }


