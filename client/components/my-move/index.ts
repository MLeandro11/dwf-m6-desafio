const hands = {
	tijera: require("url:../../image/tijera.png"),
	piedra: require("url:../../image/piedra.png"),
	papel: require("url:../../image/papel.png"),
};
class Move extends HTMLElement{
    shadow: ShadowRoot
    move
    constructor(){
        super()
    }
    connectedCallback(){
        this.shadow = this.attachShadow({mode: 'open'})
        this.move = this.getAttribute('move')
        const size = this.getAttribute('size') || ""
        const style = document.createElement('style')
        style.innerHTML = `
        .img{
            height: ${size}px
        }
        `
        this.shadow.append(style)
        this.render()
    }
    render(){     
        const img = document.createElement('img')
        img.className = "img"
        if (this.move == 'piedra') {
            img.src = `${hands[this.move]}`
            
        }if (this.move == 'papel') {
            img.src = `${hands[this.move]}`
            
        }if (this.move == 'tijera') {
            img.src = `${hands[this.move]}`
            
        }
        
        
        this.shadow.append(img)
    }
}
customElements.define('my-move', Move)