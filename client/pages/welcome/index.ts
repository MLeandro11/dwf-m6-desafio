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
            <my-loading>Iniciando Partida...</my-loading>
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
        <div class="container">
        <h1 class="h1">Piedra Papel o Tijera</h1>
        <div class="button">
        <my-button class="start">Nuevo Juego</my-button>
        <my-button class="room">Ingresar a sala</my-button>
        </div>
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
            .h1{
                font-family: 'Odibee Sans', cursive; 
                font-size: 80px;
                font-weight: 700;
                text-align: left;
                line-height: 70.48px;
                color: #009048 
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
            .button{
                display: grid;
                gap: 10px;
            }
        `
        this.shadow.appendChild(style)
    }
}
customElements.define('my-home', HomePage)



    
     
    
    

    
    
