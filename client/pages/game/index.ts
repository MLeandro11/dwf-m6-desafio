import {Router} from '@vaadin/router';
import { state } from '../../state';
class GamePage extends HTMLElement{
    shadow: ShadowRoot
    connectedCallback(){
        this.shadow = this.attachShadow({mode: 'open'})
        const cs = state.getState()
        if (!cs.rtdbRoomId) {
            Router.go("/")
        }
        state.subscribe(()=>{
            const {currentGame} = state.getState()
            if (currentGame.playerOne.choice && currentGame.playerTwo.choice) {
                Router.go("/results")
            } 
        })
        this.render()
    }
        
    counter(){
        let counter = 3
    const intervalId = setInterval(()=>{
        counter--;
        if (counter < 0) {
            clearInterval(intervalId);
            this.shadow.innerHTML =`
            <div class="cartel">
                <p>¡Se agoto el tiempo!</p>
                <button class="reset">¡reset!</button>
                <button class="exit">Exit</button>
            </div>
            `
            const buttonReset = this.shadow.querySelector('.reset')
            buttonReset?.addEventListener('click', e =>{
                state.updateGame({start: false, choice:''})
                Router.go("/play")
                
            })
            const buttonExit = this.shadow.querySelector('.exit')
            buttonExit?.addEventListener('click', e =>{
                state.updateGame({start:false, online:false, choice:''})
                Router.go("/")
            })
        }
        },1000)
    }
    addListeners(){
        const piedra:any = this.shadow.querySelector('.piedra')
        const papel:any = this.shadow.querySelector('.papel')
        const tijera:any = this.shadow.querySelector('.tijera')
        piedra?.addEventListener('click', (e: any)=>{
            state.updateGame({choice: "piedra"})
        })
        papel?.addEventListener('click', (e: any)=>{
            state.updateGame({choice: "papel"})
        })
        tijera?.addEventListener('click', (e: any)=>{
            state.updateGame({choice: "tijera"})
        })
    }
    render(){
        this.counter()
        this.shadow.innerHTML = `
        <h1>Game</h1>
        <div class="move">
        <button class="piedra">piedra</button>
        <button class="papel">papel</button>
        <button class="tijera">tijera</button>
        </div>
        `

        const style = document.createElement('style')
        style.innerHTML = ``
        this.shadow.appendChild(style)
        this.addListeners()
    }
}
customElements.define('my-game', GamePage)