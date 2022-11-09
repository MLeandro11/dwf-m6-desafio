class Loading extends HTMLElement{
    shadow: ShadowRoot 
    constructor(){
        super()
    }
    connectedCallback(){
        this.shadow = this.attachShadow({mode: 'open'})
        this.render()
    }
    render(){
        this.shadow.innerHTML = `
        <div class="container">
        <h1 class="h1">Piedra Papel o Tijera</h1>
        <my-text size="45px" align="center">${this.textContent}</my-text>
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
customElements.define('my-loading', Loading)