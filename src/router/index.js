import EventEmitter from "./EventEmitter";



class Router {
  constructor() {
    this.host = window.location.host;
    this.renderDom = null;
  }

  push(link) {
    const url = link.replace(this.host, "").replace("http://", "");
    window.history.pushState(
      {
        page: link,
      },
      null,
      url
    );
    emmiter.emit("goto", url);
  }

  linkInit() {
    const links = document.querySelectorAll("A");
    links.forEach((item) => {
      item.addEventListener("click", (e) => {
        e.preventDefault();
        this.push(e.target.href);
      });
    });
  }

  switch(routes) {
    if (!this.renderDom) {
      this.renderDom = document.querySelector(".render");
    }

    emmiter.subscribe("goto", (url) => {
      try {
        const currentElement = routes.find(({ path }) => path === url)
          .component;
        this.renderDom.innerHTML = "";
        this.renderDom.appendChild(currentElement());
      } catch (e) {
        this.renderDom.innerHTML = "<strong>404</strong>";
      }
    });
  }
}

const routes = [
  {
    path: "/videos",
    component: createVideos,
  },
  {
    path: "/password",
    component: PasswordField,
  },
  {
    path: "/home",
    component: createHome,
  },
];

// run code here
const emmiter = new EventEmitter();
const router = new Router();
router.linkInit();
router.switch(routes);

// const nextButton = document.getElementById('login__next-button');
// nextButton.addEventListener('click', (event) => {
//   event.preventDefault();

//   window.location.href = window.location.origin + '/videos'
//   console.log(window.location.origin + '/videos')
// }, false)

function createVideos() {
  const div = document.createElement("DIV");
  div.textContent = "VIDEO";

  var someInfo = document.createElement("div");
  someInfo.innerHTML = `<h1>hi video</h1>`;

  div.appendChild(someInfo);

  return div;
}

function PasswordField() {
  const div = document.createElement("DIV");
  div.textContent = "password";

  const loginWrapper = document.querySelector('.login__wrapper')
  const nextButton = document.querySelector('#login__next-button')
  const changeEmailTitle = document.querySelector('.logo__sign-in h3')
  const changeInputField = document.querySelector('.logo__sign-in #user-email')
 

  loginWrapper.style.opacity = '0';
  loginWrapper.style.transition = "all 1s ease-out"

  setTimeout(()=>{
    loginWrapper.style.opacity = '1';
    changeEmailTitle.innerText = "Enter password";
    changeInputField.outerHTML = `<input type="password" id="user-pw" required />`;
    nextButton.outerHTML = `<button type="submit" id="login__sign-in" class="ms-Button ms-Button--primary">Log in</button>`
  },1000)
 

  // div.appendChild(changeEmailTitle);
  return div;
}

function createHome() {
  const div = document.createElement("DIV");
  div.textContent = "HOME";
  return div;
}
