import { data } from "../constans/data.js";
import { renderList,  } from "../JS/render.js";
import { showNotShowLoader, showNotShowForm, formatData, clearForm } from "../helper/helpers.js";
import { inputName, inputText } from "../JS/comments.js";
import {  authorizationUser } from "../JS/authorization.js";

const host = 'https://wedev-api.sky.pro/api/v2/inna-svergun/comments'
const hostAuht = 'https://wedev-api.sky.pro/api/user';





async function getCommentsList(firstLoader = 1) {

let optionsQuery = null 

 if (firstLoader) {
    showNotShowLoader(true, 'Идет загрузка...')
 }


  if (authorizationUser.getToken()) {
    optionsQuery = { 
      method: 'GET',
      headers:{
        Authorization:`Bearer ${authorizationUser.getToken()}`
      }
    }
  } else {
    optionsQuery = {
      method: 'GET'
    }
  }

  try {

    
    const respons = await fetch(host, optionsQuery)
    
  
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
    console.log(apiData)
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
        headers: {
         Authorization:`Bearer ${authorizationUser.getToken()}`
        },
        body: JSON.stringify(newComment),
        forceError: true,
    })
    console.log(newComment);
    console.log(respons.status); 

    if(navigator.online === false){
      console.log(navigator.onLine);
      throw new Error('Вы не в сети')
    }
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

const login = (user)=>{
  return fetch(hostAuht + '/login', {
    method: 'POST',
    body: JSON.stringify(user)
  })
}

const registration = (user) =>{
  return fetch(hostAuht, {
    method: 'POST',
    body: JSON.stringify(user)
  })
}
export { getCommentsList, postComment, login, registration }

