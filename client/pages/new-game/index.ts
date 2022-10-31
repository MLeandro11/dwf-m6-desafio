import {Router} from '@vaadin/router';
import { state } from '../../state';
class NewGamePage extends HTMLElement{
    shadow: ShadowRoot
    connectedCallback(){
        this.shadow = this.attachShadow({mode: 'open'})
        this.render()
        const formEl = this.shadow.querySelector('.form')
        formEl?.addEventListener('submit', (e: any)=>{
            e.preventDefault()
            const name = e.target.name.value
            state.setData({name});   
            state.registerPlayer(()=>{
                state.askNewRoom(()=>{
                    return state.accessToRoom(()=>{
                    Router.go('/start')
                })
                })
            })
        }) 
    }
    render(){
        this.shadow.innerHTML = `
        <h1 class="h1">Piedra Papel o Tijera</h1>
        <form class="form">
        <label for="name">Tu Nombre</label>
        <input required id="name" type="text" name="name">
        <button>Empezar</button>
        </form>
        `

        const style = document.createElement('style')
        style.innerHTML = ``
        this.shadow.appendChild(style)
    }
}
customElements.define('new-game', NewGamePage)
