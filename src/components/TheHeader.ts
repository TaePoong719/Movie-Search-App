import { Component } from "../core/heropy";

interface State{
  [key:string] :unknown
  menus: {
    name: string
    href: string
  }[]
}

export default class TheHeader extends Component{
  public state! : State
  constructor(){
    super({
      tagName: 'header',
      state: {
        menus: [
          {
            name: 'Search',
            href: '#/',
          },
          {
            name: 'Movie',
            href: '#/movie?id=tt4520988',
          },
          {
            name: 'About',
            href: '#/about',
          }
        ]
      }
    })
    // 페이지가 바뀔 때 마다 
    window.addEventListener('popstate',()=>{
      this.render()
    })
  }

  render(){
    this.el.innerHTML = /* html */`
      <a href="#/" class="logo"><span>OMDbAPI</span>.COM</a>
      <nav> 
        <ul>
          ${this.state.menus.map(menu=>{
            // 이동할 페이지 주소 ~ 누르기 전
            const href = menu.href.split('?')[0]
            // 현재 페이지 주소
            const hash = location.hash.split('?')[0]
            const isActive = href === hash
            return /* html */`
              <li>
                <a class="${isActive ? 'active' : ''}" 
                  href="${menu.href}">
                  ${menu.name}
                </a>
              </li>
              `
          }).join('')}
        </ul>
      </nav>
      <a href="#about" class="user">
        <img src="https://heropy.blog/css/images/logo.png" alt="User">
      </a>
    `
  }
}
