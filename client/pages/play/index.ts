import {Router} from '@vaadin/router';
import { state } from '../../state';
class PlayPage extends HTMLElement{
    playerOne:Object
    playerTwo:Object
    room:Number
    shadow: ShadowRoot
    connectedCallback(){
        
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
            this.playerOne = cs.currentGame.playerOne
            this.playerTwo = cs.currentGame.playerTwo
            this.render()
            if (currentGame.playerOne.start && currentGame.playerTwo.start) {
                Router.go("/game")
            }  
        })
    }
    addListeners(){
        const buttonStartEl = this.shadow.querySelector('.start')
        buttonStartEl?.addEventListener('click', (e: any)=>{
            state.updateGame({start: true})
            /* this.shadow.innerHTML = `
            <p>Esperando a que ${this.playerTwo['name']} presione ¡Jugar!...</p>
            ` */
        })
    }
    render(){
        this.shadow.innerHTML = `
        <div>
        <h4 >${this.playerOne['name'] || 'cargando datos' }</h4>
        <h4 >${this.playerOne['history'] ? Object.values(this.playerOne['history']).filter(p => p === 'ganaste' ).length : '0'}</h4>
        <h4 >Online: ${this.playerOne['online']? '🟢': '🔴'}</h4>
        </div>
        <div>
        <h4 >${this.playerTwo['name'] || 'cargando datos'}</h4>
        <h4 >${this.playerTwo['history'] ? Object.values(this.playerTwo['history']).filter(p => p === 'ganaste' ).length : '0'}</h4>
        <h4 >Online: ${this.playerTwo['online']? '🟢': '🔴'}</h4>
        </div>
        <h4>Room:${this.room}</h4>
        <p>Presioná jugar y elegí: piedra, papel o tijera antes de que pasen los 3 segundos.</p>
        <button class="start">Jugar!</button>
        `

        const style = document.createElement('style')
        style.innerHTML = ``
        this.shadow.appendChild(style)
        this.addListeners()
    }
}
customElements.define('my-play', PlayPage)