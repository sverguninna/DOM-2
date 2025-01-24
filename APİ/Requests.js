import { data } from "../constans/data.js";
import { renderList } from "../JS/render.js";
import { showNotShowLoader, showNotShowForm } from "../helper/helpers.js";

const host = 'https://wedev-api.sky.pro/api/v1/inna-svergun/comments'


async function getCommentsList(firstLoader = 1) {

 if (firstLoader) {
    showNotShowLoader(true, 'Идет загрузка...')
 }

  try {
    const respons = await fetch(host)

    if (respons.status === 404) {
        throw new Error('Проблемы с сервером!')
    }

    const objComment = await respons.json()

    let apiData = objComment.comments.map((comment) => {
        return {
             name: comment.author.name,
             text: comment.text,
             userNumLike: comment.likes ,
             date: comment.date, 
             id: comment.id,
             like: comment.isliked,
        }
    })

    data.setUserComments(apiData)
    renderList()
    
  } catch (error) {
    alert(error.message)
    showNotShowLoader(false, '')
  }
}

async function postComment(newComment) {
   showNotShowForm(false)
   showNotShowLoader(true, 'Комментарий добавляется...')
   try {

    let respons = await fetch(host, {
        method : 'POST',
        body: JSON.stringify(newComment),
    })

    if (respons.status === 404) {
        throw new Error('Проблемы с сервером!')
    }

    await getCommentsList(0)
    showNotShowForm(true)

   } catch (error) {
     alert(error.message)
     showNotShowForm(true)
   }
    
}

export { getCommentsList, postComment}

