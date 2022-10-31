import {Router} from '@vaadin/router';
import { state } from '../../state';
class StartPage extends HTMLElement{
    playerOne:String
    playerTwo:String
    room:Number
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
            if (currentGame.playerOne.online && currentGame.playerTwo.online && !currentGame.playerOne.start) {
                Router.go("/play")
            }    
        })
    }
    render(){
        this.shadow.innerHTML = `
        <h4 >${this.playerOne}</h4>
        <h4 >${this.playerTwo || 'Esperando rival...'}</h4>

        <p>Comparti tu codigo</p>
        <h1>Room:${this.room}</h1>
        `
        const style = document.createElement('style')
        style.innerHTML = ``
        this.shadow.appendChild(style)
    }
}
customElements.define('my-start', StartPage)