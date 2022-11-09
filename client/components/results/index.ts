const results = {
	ganaste: require("url:../../image/ganaste.png"),
	perdiste: require("url:../../image/perdiste.png"),
	empate: require("url:../../image/empate.png"),
};
    class Result extends HTMLElement{
        shadow: ShadowRoot
        result
        constructor(){
            super()
        }
        connectedCallback(){
            this.shadow = this.attachShadow({mode: 'open'})
            this.result = this.getAttribute('result')
            this.shadow.innerHTML = `
            <div class="texto">
            <my-text>${this.result.toUpperCase()}</my-text>
            </div>
            `
            const style = document.createElement('style')
            style.innerHTML = `

            :host {
                position: relative;
            }
            .texto{
                position: absolute;
                bottom: 85px;
                left: 23%;
            }
            .img{   
                height: 220px; 
            }

            `
            
            this.shadow.append(style)
            this.render()
        }
        render(){     
            const img = document.createElement('img')
            img.className = "img"
            if (this.result == 'ganaste') {
                img.src = `${results[this.result]}`
                
            }if (this.result == 'perdiste') {
                img.src = `${results[this.result]}`
                
            }if (this.result == 'empate') {
                img.src = `${results[this.result]}`
                
            }
            
            
            this.shadow.append(img)
        }
    }
    customElements.define('my-result', Result)
