class Counter extends HTMLElement{
    shadow: ShadowRoot
    constructor(){
        super()
        this.shadow = this.attachShadow({mode: 'open'})
        this.countdown();
    }

    render(time){
        
        this.shadow.innerHTML = `
        <div class="counter">
        <h1>${time}</h1>
        </div>
        `
        const style = document.createElement('style')
        style.innerHTML = `
        .counter{
            border-radius: 100%;
            border: solid 20px #000;
            Width: 200px;
            Height: 200px;
            margin: 0 auto
        }
        .counter > h1{
            font-size:100px;
            text-align: center;
            font-family: 'Odibee Sans', cursive; 
            margin: 0;
            margin-top: 50px;   
        }

        `
        this.shadow.appendChild(style)

    }
    countdown(){
        let counter = 3
        const intervalId = setInterval(()=>{
         
            if (counter >= 0) {
                this.render(counter);
                
                counter--;
            }
             else {
                clearInterval(intervalId);
            }
            },1000)
    }
}
customElements.define('my-counter', Counter)


    