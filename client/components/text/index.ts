class Paragraph extends HTMLElement{
    shadow: ShadowRoot 
    constructor(){
        super()
    }
    connectedCallback(){
        this.shadow = this.attachShadow({mode: 'open'})
        const color = this.getAttribute('color') || '#000'
        const size = this.getAttribute('size') || '40px'
        const align = this.getAttribute('align') || 'left'
        const weight = this.getAttribute('weight') || ''
        const style = document.createElement('style')
        style.innerHTML = `
        .body{
            font-family: 'Odibee Sans', cursive; 
            font-size: ${size};
            color: ${color};
            margin: 0px;
            text-align: ${align};
            font-weight: ${weight};
        }
        `
        this.shadow.append(style)
        this.render()
    }
    render(){
        const p = document.createElement('p')

        p.className = "body"
        p.textContent = this.textContent
        
        this.shadow.append(p)
    }
}
customElements.define('my-text', Paragraph)



            