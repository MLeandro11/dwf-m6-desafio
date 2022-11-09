import {Router} from '@vaadin/router';
import { state } from '../../state';
class ResultsPage extends HTMLElement{
    results
    playerOne
    playerTwo
    playerWinOne
    playerWinTwo
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
        const playerOneWin = Object.values(cs.currentGame.playerOne.history).filter(p => p === 'ganaste' ).length
        const playerTwoWin = Object.values(cs.currentGame.playerTwo.history).filter(p => p === 'ganaste' ).length
        this.playerWinOne = playerOneWin
        this.playerWinTwo = playerTwoWin
        this.playerOne = cs.currentGame.playerOne
        this.playerTwo = cs.currentGame.playerTwo
        if (cs.currentGame.playerOne.history) {
            const history = Object.values(cs.currentGame.playerOne.history)
            this.results = history[history.length -1]
            
        }
        this.render()        
    }
    addListeners(){
        const buttonReset = this.shadow.querySelector('.reset')
        const buttonExit = this.shadow.querySelector('.exit')
        buttonReset?.addEventListener('click', e =>{
            state.updateGame({
                choice:'',
            })
            Router.go("/play")
        })
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
        <div class="container">
            <div class="cnt-results">
                <my-result result="${this.results}"></my-result>
                <div class="score">
                    <my-text>Resultados</my-text>
                    <my-text>${this.playerOne.name}: ${this.playerWinOne}</my-text>
                    <my-text color="#FF6442">${this.playerTwo.name}: ${this.playerWinTwo}</my-text>
                </div>
            </div>
            <div class="cnt-button">
                <my-button class="reset">¡reset!</my-button>
                <my-button class="exit">Exit</my-button>
            </div>
        </div>

        `

        const style = document.createElement('style')
        style.innerHTML = `
        .container{
            width: 375px;
            margin: 0 auto;
            height: 100vh;
            overflow: hidden;
        }
        .cnt-results{
            display: flex;
            flex-direction: column;
            gap: 10px;
            align-items: center;
        }
        
        .score{
            border: solid 10px;
            border-radius: 10px;
            padding: 10px 
        }
        .cnt-button{
            margin-top: 20px;
            display: flex;
            flex-direction: column;
            gap: 20px
        }
        `
        this.shadow.appendChild(style)
        this.addListeners()
    }
}
customElements.define('my-results', ResultsPage)