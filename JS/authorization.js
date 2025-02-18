import { login, registration, getCommentsList} from "../APİ/Requests.js";
import { data } from "../constans/data.js";
import { commentsList, renderList } from "./render.js";


const authorizationUser = {
  token: '', 
  setToken: function (newToken) {
    this.token = newToken
  }, 
  getToken: function () {
   return this.token
  },
  name: '',
  setName: function (newName) {
    this.name= newName
  },
  getName: function () {
    return this.name
  }
}

/* let usersLocal = []; */

function renderLogin() {
  commentsList.innerHTML = `
      <div class="login-box">
        <h2 class="form-name" >Введите логин и пароль</h2>
        <form class ="login-form">
          <input class="Login-name" type="text" placeholder="Username">
          <input class="login-password" type="password" placeholder="Password">
          <button type="button" class="add-login"> Войти </button>
        </form>
      </div>
    `;
  const loginName = document.querySelector('.Login-name')
  const loginPassword = document.querySelector('.login-password')
  const addLogin = document.querySelector('.add-login')

  addLogin.addEventListener('click', () => {

    let newUser = {
      login: loginName.value,
      password: loginPassword.value
    }

    login(newUser)
    .then((response) => {
      if(response.status === 400){
        throw new Error('Не верно введен пароль или имя')
      }
      return response.json()
    })
    .then((user) => {
      console.log(user)
  /*    usersLocal = localStorage.setItem(user) */
      authorizationUser.setToken(user.user.token)
      authorizationUser.setName(user.user.name)
      getCommentsList()
    }).catch((error) => {
      alert(error.massage)
    })
  })

}

function renderRegistration() {

  commentsList.innerHTML = `
       <div class="Registration-box" >
          <h2 class="form-name"  >Регистрация</h2>
          <form class = "Registration-form ">
             <input class="Registration-name" type="text" placeholder="Введите имя">
             <input class="Registration-login" type="email" placeholder="Введите логин">
             <input class="Registration-password" type="password" placeholder="Введите пароль">
             <button  type="button"  class="add-registration">Зарегистрироваться</button>
          </form>
       </div>
    `;
  const registrationName = document.querySelector('.Registration-name')
  const registrationLogin = document.querySelector('.Registration-login')
  const registrationPassword = document.querySelector('.Registration-password')
  const addRegistration = document.querySelector('.add-registration')

  addRegistration.addEventListener('click', () => {

    let newUser = {
      login: registrationLogin.value,
      name: registrationName.value,
      password: registrationPassword.value,
    };

    console.log(newUser)

    registration(newUser)
      .then((response) => {
        if(response.status === 400){
          throw new Error('Такой пользователь уже есть')
        }
        return response.json() 
      }).then((user) => {
        console.log(user);
     /*    usersLocal = localStorage.setItem(user) */
        authorizationUser.setToken(user.user.token)
        authorizationUser.setName(user.user.name)
        getCommentsList()
      }).catch((error) => {
         alert(error.massage)
      })
  })

}
export { renderRegistration, renderLogin, authorizationUser, /* usersLocal */ }
