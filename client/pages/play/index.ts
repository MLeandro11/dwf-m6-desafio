import {Router} from '@vaadin/router';
import { state } from '../../state';
class PlayPage extends HTMLElement{
    playerOne:Object
    playerTwo:Object
    room:string
    shadow: ShadowRoot
    connectedCallback(){
        window.addEventListener('beforeunload', (event) => {
            event.preventDefault();
            state.updateGame({
                choice: '',
                start: false,
                online: false
            })
            event.returnValue = '';
        });
        this.shadow = this.attachShadow({mode: 'open'})
        const cs = state.getState()
        if (!cs.rtdbRoomId) {
            Router.go("/")
        }
        this.room = cs.roomId
        this.playerOne = cs.currentGame.playerOne
        this.playerTwo = cs.currentGame.playerTwo
        this.render()
        state.subscribe(()=>{
            const {currentGame} = state.getState()
            this.playerOne = currentGame.playerOne
            this.playerTwo = currentGame.playerTwo
            this.render()
        })
    }
    addListeners(){
        const buttonStartEl = this.shadow.querySelector('.start')
        buttonStartEl?.addEventListener('click', (e: any)=>{
            state.updateGame({start: true})
            Router.go("/waiting-ready-opponent")
        })
    }
    render(){
        this.shadow.innerHTML = `
        <div class="container">
            <div class="scoreboard">
                <div class="players">
                    <my-text size="24px">${this.playerOne['name'] || 'cargando datos' }: ${this.playerOne['history'] ? Object.values(this.playerOne['history']).filter(p => p === 'ganaste' ).length : '0'}</my-text>
                    <my-text size="24px">Online: ${this.playerOne['online']? '🟢': '🔴'}</my-text>
                    <my-text size="24px" color="#FF6442">${this.playerTwo['name'] || 'cargando datos'}: ${this.playerTwo['history'] ? Object.values(this.playerTwo['history']).filter(p => p === 'ganaste' ).length : '0'}</my-text>
                    <my-text size="24px">Online: ${this.playerTwo['online']? '🟢': '🔴'}</my-text>
                </div>
                 <div class="room">
                    <my-text weight="700" size="24px">Sala</my-text>
                    <my-text size="24px">${this.room.toUpperCase()}</my-text>
                </div>
            </div>
            <div class="title">
                <my-text size="35px" align="center">Presioná jugar y elegí: piedra, papel o tijera antes de que pasen los 3 segundos.</my-text>
            </div>
            <my-button class="start">Jugar!</my-button>
            <div class="move-uno">
                <my-move move="tijera"></my-move>
            </div>
            <div class="move-dos">
                <my-move move="piedra"></my-move>
            </div>
            <div class="move-tres">
                <my-move  move="papel"></my-move>
            </div>
        </div>
        `

        const style = document.createElement('style')
        style.innerHTML = `
            .container{
                position: relative;
                width: 375px;
                margin: 0 auto;
                height: 100vh;
                overflow: hidden;
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
            .scoreboard{
                display: flex;
                justify-content: space-between;
                padding: 20px 20px 0;
                align-items: center;
                margin-bottom: 100px
            }
            .title{
                margin-bottom: 40px
                
            }
            
        `
        this.shadow.appendChild(style)
        this.addListeners()
    }
}
customElements.define('my-play', PlayPage)