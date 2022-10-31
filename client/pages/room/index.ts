import {Router} from '@vaadin/router';
import { state } from '../../state';
class RoomPage extends HTMLElement{
    name: string = ''
    playerId: string = ''
    shadow: ShadowRoot
    connectedCallback(){
        this.shadow = this.attachShadow({mode: 'open'})
        const cs = state.getState()
        this.playerId = cs.playerId
        this.name = cs.name
        this.render()
        const formEl = this.shadow.querySelector('.form')
        formEl?.addEventListener('submit', (e: any)=>{
            e.preventDefault()
            const name = this.name || e.target.name.value
            const roomId = e.target.room.value
           state.setData({name,roomId:+roomId})
           if (!this.playerId) {
               state.registerPlayer(()=>{
                   return state.accessToRoom(()=>{
                       state.updateGame({online: true,name: name, start: false})
                       Router.go('/play')
                   })
                })
            }
            if (this.playerId) {
                return state.accessToRoom(()=>{
                    state.updateGame({online: true, name: name, start: false})
                    Router.go('/play')
                })
            }
        })  
    }   
    render(){
        this.shadow.innerHTML = `
        <h1 class="h1">Piedra Papel o Tijera</h1>
        <form class="form">
        ${!this.name ? `<label>Nombre
        <input required type="text" name="name" >
        </label>`: ""}
        <label>Sala:
        <input required type="number" name="room">
        </label>
        <button>Ingresar a sala</button>
        </form>
        `

        const style = document.createElement('style')
        style.innerHTML = ``
        this.shadow.appendChild(style)
    }
}
customElements.define('my-room', RoomPage)