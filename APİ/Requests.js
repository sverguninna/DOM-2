import { data } from "../constans/data.js";
import { renderList } from "../JS/render.js";
const host = 'https://wedev-api.sky.pro/api/v1/inna-svergun/comments'


async function getCommentsList() {
    let respons = await fetch(host)
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
}

async function postComment(newComment) {
    let respons = await fetch(host, {
        method : 'POST',
        body: JSON.stringify(newComment),
    })
    
    getCommentsList()
    
}

export { getCommentsList, postComment}

