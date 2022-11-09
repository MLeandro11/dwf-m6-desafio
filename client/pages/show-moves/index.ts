import {Router} from '@vaadin/router';
import { state } from '../../state';
class ShowMoves extends HTMLElement{
    playerOne
    playerTwo
    shadow: ShadowRoot
    connectedCallback(){
        this.shadow = this.attachShadow({mode: 'open'})
        const cs = state.getState()
        if (!cs.rtdbRoomId) {
            Router.go("/")
        }
        state.whoWins(cs.currentGame.playerOne.choice,cs.currentGame.playerTwo.choice)
        this.playerOne = cs.currentGame.playerOne.choice
        this.playerTwo = cs.currentGame.playerTwo.choice
        this.render()
        setTimeout(function(){
            Router.go("/results")
        }, 2000);        
    
    }

    render(){
        this.shadow.innerHTML = `
        <div class="container">
            <div class="hands">
                <div class="player-one">
                    <my-move size="300" move="${this.playerOne}"></my-move>
                </div>
                <div class="player-two">
                <my-move size="300" move="${this.playerTwo}"></my-move>
                </div>
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
        .hands  .player-one{
            position: absolute;
            left: 35%;
            bottom: 0;
        }
        .hands  .player-two{
            position: absolute;
            top: 0;
            left: 35%;
            transform: rotate(180deg);
        }
        `
        this.shadow.appendChild(style)
    }
}
customElements.define('show-moves', ShowMoves)