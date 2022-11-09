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
            const roomId = e.target.room.value.toLowerCase()
           state.setData({name,roomId})
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
        <div class="container">
        <h1 class="h1">Piedra Papel o Tijera</h1>
        <form class="form">
        ${!this.name ? `
        <my-text size="35px" align="center">Tu Nombre</my-text>
        <input required type="text" name="name" >`: ""}
        <input required name="room" placeholder="Codigo">
        <button>Ingresar a sala</button>
        </form>
        <div class="move-uno">
        <my-move move="tijera"></my-move>
        </div>
        <div class="move-dos">
        <my-move move="piedra"></my-move>
        </div>
        <div class="move-tres">
        <my-move move="papel"></my-move>
        </div>
        </div>
        `

        const style = document.createElement('style')
        style.innerHTML = `
            .container{
                position: relative;
                min-width: 375px;
                max-width: 375px;
                margin: 0 auto;
                height: 100vh;
                overflow: hidden;
            }
            .form{
                display: flex;
                flex-direction: column
            }
            .form > input{
                padding: 10px 10px;
                font-family: 'Odibee Sans', cursive;
                margin-bottom: 10px;
                border: solid 10px #182460;
                border-radius: 10px;
                font-size: 45px;
                text-align: center;
            }
            .form > button{
                background-color: #006CFC;
                color: #D8FCFC;
                border: solid 8px #001997;
                border-radius: 10px;
                width: 100%;
                padding: 8px 0;
                font-size: 45px;
                font-family: 'Odibee Sans', cursive; 
            }
            .h1{
                font-family: 'Odibee Sans', cursive; 
                font-size: 80px;
                font-weight: 700;
                text-align: left;
                line-height: 70.48px;
                color: #009048; 
            }
            .move-uno{
                position: absolute;
                left: 30px;
                bottom: -30px;
            }
        
            .move-dos{
                position: absolute;
                
                right: 43%;
                bottom: -30px;
            }
        
            .move-tres{
                position: absolute;
                right: 30px;
                bottom: -30px;
            } 
        `
        this.shadow.appendChild(style)
    }
}
customElements.define('my-room', RoomPage)