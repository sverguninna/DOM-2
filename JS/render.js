import { updateEvent } from "./comments.js"
import { data } from "../constans/data.js"

const commentsList = document.querySelector('.comments')

function renderList() {
    commentsList.innerHTML = ''
    data.userComments.map((comment)=>
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

export {renderList}