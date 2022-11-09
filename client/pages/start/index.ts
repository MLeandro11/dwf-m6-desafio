import {Router} from '@vaadin/router';
import { state } from '../../state';
class StartPage extends HTMLElement{
    playerOne:String
    playerTwo:String
    room:string
    shadow: ShadowRoot
    connectedCallback(){
        
        this.shadow = this.attachShadow({mode: 'open'})
        const cs = state.getState()
        if (!cs.rtdbRoomId) {
            Router.go("/")
        }
        this.room = cs.roomId
        this.playerOne = cs.name
        this.render()
        state.subscribe(()=>{
            const {currentGame} = state.getState()
            if (currentGame.playerOne.online && currentGame.playerTwo.online && !currentGame.playerOne.start && !currentGame.playerTwo.start && !currentGame.playerOne.choice && !currentGame.playerTwo.choice) {
                Router.go("/play")
            }    
        })
    }
    render(){
        this.shadow.innerHTML = `
        <div class="container">
        <div class="scoreboard">
        <div class="players">
        <my-text size="24px">${this.playerOne}</my-text>
        <my-text size="24px" color="#FF6442">${this.playerTwo || 'Esperando rival...'}</my-text>
        </div>
        <div class="room">
        <my-text weight="700" size="24px">Sala</my-text>
        <my-text size="24px">${this.room.toUpperCase()}<my-text>
        </div>
        </div>

        <my-text size="35px" align="center">Comparti tu codigo</my-text>
        <my-text size="48px" weight="700" align="center">${this.room.toUpperCase()}</my-text>
        <my-text size="35px" align="center">Con tu contrincante</my-text>
        <div class="move-uno">
        <my-move  move="tijera"></my-move>
        </div>
        <div class="move-dos">
        <my-move  move="piedra"></my-move>
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
        .text{
            margin-bottom:45px
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
        `
        this.shadow.appendChild(style)
    }
}
customElements.define('my-start', StartPage)