import {Router} from '@vaadin/router';
import { state } from '../../state';
class HomePage extends HTMLElement{
    shadow: ShadowRoot
    connectedCallback(){
        this.shadow = this.attachShadow({mode: 'open'})
        const cs = state.getState()
        this.render()
        const buttonStartEl = this.shadow.querySelector('.start')
        const buttonRoomtEl = this.shadow.querySelector('.room')
        buttonStartEl?.addEventListener('click', (e: any)=>{
            if (!cs.playerId) {
                return Router.go('/new-game')
            }
            this.shadow.innerHTML = `
            <p>Iniciando partida</p>
            `
            state.askNewRoom(()=>{
                state.accessToRoom(()=>{
                Router.go('/start')
            })
            })
        })  
        buttonRoomtEl?.addEventListener('click', (e: any)=>{
            Router.go('/room')
        })
    }
    render(){
        this.shadow.innerHTML = `
        <h1 class="h1">Piedra Papel o Tijera</h1>
        <button class="start">Nuevo Juego</button>
        <button class="room">Ingresar a sala</button>
        `
        const style = document.createElement('style')
        style.innerHTML = ``
        this.shadow.appendChild(style)
    }
}
customElements.define('my-home', HomePage)



    
     
    
    

    
    
