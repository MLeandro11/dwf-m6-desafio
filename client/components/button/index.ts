class Button extends HTMLElement{

    shadow: ShadowRoot 
    constructor(){
        super()
    }
    connectedCallback(){
        this.shadow = this.attachShadow({mode: 'open'})
        this.shadow.innerHTML = `
        <button class="button">${this.textContent}</button>
        `
        const style = document.createElement('style')
        style.innerHTML = `
        .button{
            background-color: #006CFC;
            color: #D8FCFC;
            border: solid 8px #001997;
            border-radius: 10px;
            width: 100%;
            
            padding: 8px 0;
            font-size: 45px;
            font-family: 'Odibee Sans', cursive; 
        }
        `
        this.shadow.appendChild(style)
    }
}
customElements.define('my-button', Button)

