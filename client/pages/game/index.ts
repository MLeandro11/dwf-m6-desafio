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
        this.render()
        state.subscribe(()=>{
            const {currentGame} = state.getState()
                if (currentGame.playerOne.choice && currentGame.playerTwo.choice) {
                    Router.go("/show-moves")
            }
        })
    }
        
    counter(){
        let counter = 3
    const intervalId = setInterval(()=>{
        counter--;
        if (counter < 0) {
            clearInterval(intervalId);
            this.shadow.innerHTML =`
            <div class="container">
            <div class="cartel">
            <my-text>¡Se agoto el tiempo!</my-text>
            <my-button class="reset">¡reset!</my-button>
            <my-button class="exit">Exit</my-button>
            </div>
            </div>
            
            <style>
            .container{
                width: 375px;
                margin: 0 auto;
                height: 100vh;
                overflow: hidden;
                padding: 118px 0;
            }
            .cartel{
                display: flex;
                flex-direction: column;
                gap: 40px
            }
            </style>
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
        const jugadas:any = this.shadow.querySelector('.hands')?.children
        for (const iterator of jugadas) {
        
            iterator?.addEventListener('click', (e:any)=>{
                state.updateGame({choice: e.target.move, start: false})
                
                this.shadow.innerHTML = `
                <div class="container">
                    <div class="hands">
                        <div class="my-move">
                            <my-move size="300" move="${e.target.move}"></my-move>
                        </div>
                    </div>
                </div>

                <style>
                .container{
                    position: relative;
                    width: 375px;
                    margin: 0 auto;
                    height: 100vh;
                    overflow: hidden;
                }
                .hands  .my-move{
                    position: absolute;
                    left: 35%;
                    bottom: 0;
                }
                </style>
                `
            })
        }
    }
    render(){
        this.counter()
        this.shadow.innerHTML = `
        <div class="container">
            <my-counter></my-counter>
            <div class="hands">
                <div class="move-uno">
                    <my-move size="200" move="tijera"></my-move>
                </div>
                <div class="move-dos">
                    <my-move size="200" move="piedra"></my-move>
                </div>
                <div class="move-tres">
                    <my-move size="200" move="papel"></my-move>
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
        .hands .move-uno{
            position: absolute;
            left: 0;
            bottom: -50px;
        }
    
        .hands .move-dos{
            position: absolute;
            
            right: 150px;
            bottom: -50px;
        }
    
        .hands .move-tres{
            position: absolute;
            right: 0;
            bottom: -50px;
        }
        .hands .move-uno:hover{
            bottom: 0
        }
        .hands .move-dos:hover{
            bottom: 0
        }
        .hands .move-tres:hover{
            bottom: 0
        }
        `
        this.shadow.appendChild(style)
        this.addListeners()
    }
}
customElements.define('my-game', GamePage)