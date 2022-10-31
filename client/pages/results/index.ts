import {Router} from '@vaadin/router';
import { state } from '../../state';
class ResultsPage extends HTMLElement{
    results
    playerTwo
    shadow: ShadowRoot
    connectedCallback(){
        this.shadow = this.attachShadow({mode: 'open'})
        const cs = state.getState()
        if (!cs.rtdbRoomId) {
            Router.go("/")
        }
        state.whoWins(cs.currentGame.playerOne.choice,cs.currentGame.playerTwo.choice)
        this.render() 
        state.subscribe(()=>{
            const cs = state.getState()
            if (cs.currentGame.playerOne.history) {
            const history = Object.values(cs.currentGame.playerOne.history)
            this.results = history[history.length -1]}
            this.render()        
        })
    }
    addListeners(){
        const buttonReset = this.shadow.querySelector('.reset')
            buttonReset?.addEventListener('click', e =>{
                state.updateGame({choice:'',start: false})
                Router.go("/play")
            })
            const buttonExit = this.shadow.querySelector('.exit')
            buttonExit?.addEventListener('click', e =>{
                state.updateGame({
                    start:false, 
                    online:false,
                    choice:''
                })
                Router.go("/")
            })
    }
    render(){
        this.shadow.innerHTML = `
        <h1 >Resultado: ${this.results || ''}</h1>
        <button class="reset">¡reset!</button>
        <button class="exit">Exit</button>
        `

        const style = document.createElement('style')
        style.innerHTML = ``
        this.shadow.appendChild(style)
        this.addListeners()
    }
}
customElements.define('my-results', ResultsPage)