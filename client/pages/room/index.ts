import {Router} from '@vaadin/router';
import { state } from '../../state';
class RoomPage extends HTMLElement{
    shadow: ShadowRoot
    connectedCallback(){
        this.shadow = this.attachShadow({mode: 'open'})
        this.render()
        const buttonStartEl = this.shadow.querySelector('.start')
        const buttonRoomtEl = this.shadow.querySelector('.room')
        buttonStartEl?.addEventListener('click', (e: any)=>{
           
        })  
        buttonRoomtEl?.addEventListener('click', (e: any)=>{
         
        })  
        
    }
    render(){
        this.shadow.innerHTML = `
        <h1 class="h1">Piedra Papel o Tijera</h1>
        <form>
        <input type="text" >
        <button class="room">Ingresar a sala</button>
        </form>
        `

        const style = document.createElement('style')
        style.innerHTML = ``
        this.shadow.appendChild(style)
    }
}
customElements.define('my-room', RoomPage)