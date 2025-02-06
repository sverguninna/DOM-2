import { data } from "../constans/data.js";
import { renderList } from "../JS/render.js";
import { showNotShowLoader, showNotShowForm, formatData, clearForm } from "../helper/helpers.js";
import { inputName, inputText } from "../JS/comments.js";

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
    if (respons.status === 500) {
      throw new Error('внутренняя ошибка сервера!')
   }
    const objComment = await respons.json()

    let apiData = objComment.comments.map((comment) => {
  
        return {
             name: comment.author.name,
             text: comment.text,
             userNumLike: comment.likes,
             date: formatData(comment.date),
             id: comment.id,
             like: comment.isLiked,
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
   try {

    let respons = await fetch(host, {
        method : 'POST',
        body: JSON.stringify(newComment),
        forceError: true,
    })
    
    console.log(respons.status); 

    if (respons.status === 404) {
        throw new Error('Проблемы с сервером!')
    }
    if (respons.status === 400) {
      throw new Error('введено не достаточно символов')
    }
    if(respons.status === 500) {
      throw new Error('внутренняя ошибка сервера')

    }
    clearForm(inputName, inputText)
    await getCommentsList(0)
    showNotShowForm(true)


   } catch (error) {
     alert(error.message)
     showNotShowForm(true)
   }
    
}

export { getCommentsList, postComment}

