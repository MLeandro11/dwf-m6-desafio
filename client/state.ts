type Jugada =   'piedra' | 'papel' | 'tijera'

const API_BASE_URL = "http://localhost:4000"
const state = {
    data: {
        name:"",
        playerId:"",
        roomId:"",
        rtdbRoomId:"",
        currentGame:{
            computerPlay: "",
            myPlay: ""
        },
        history: []
      },
    listeners:[],
    /* init(){
        const playerData:any = localStorage.getItem('saved-id')
        
        if (!playerData) {
            return
        } else {
            const cs= this.getState()
            const data = JSON.parse(playerData)
            cs.name = data.name
            cs.playerId = data.playerId
            this.setState(cs)
            
        }
    }, */
    registerPlayer(name,callback){
        const cs= this.getState()
        fetch(API_BASE_URL+"/register",{
                method: 'post',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({name})
                
            })
            .then(res => res.json())
            .then(data => {
                const id = data.id
                cs.name = name
                cs.playerId = id
                this.setState(cs)
                callback()
            })
    },
    askNewRoom(callback){
        const cs = this.getState()
        const {playerId} = cs
        if (playerId) {
            fetch(API_BASE_URL+"/playrooms",{
                method: 'post',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({playerId})
                
            }).then(res => res.json())
            .then(data => {
                //console.log(data);
                const {id} = data
                cs.roomId = id
                this.setState(cs)
                callback()
            })
        }else{
            console.error("error al crear nuevo room")
        }
    },
    accessToRoom(){
        const cs = this.getState()
        const {playerId,roomId} = cs
        if (playerId && roomId) {
            fetch(API_BASE_URL + `/playrooms/${roomId}?userId=${playerId}`,)
            .then(res => res.json())
            .then(data => {
                //console.log(data);
                const {rtdbRoomId} = data
                cs.rtdbRoomId = rtdbRoomId
                this.setState(cs)
            })
        }else{
            console.error("error al acceder al room")
        }
    }, 
    /* setMove(myMove: Jugada, computerMove){
        const cs = this.getState()
        cs.currentGame.myPlay = myMove
        cs.currentGame.computerPlay = computerMove
        //this.whoWins(myMove, computerMove)
        this.setState(cs)

    },

    
    whoWins(myPlay:Jugada, computerPlay){

        if (myPlay == computerPlay) {        
            this.pushToHistory('empate')
            //console.log('empate');
        } else if (myPlay == 'piedra' && computerPlay == 'tijera'){
            this.pushToHistory('ganaste')
            //console.log('ganaste');
        } else if (myPlay == 'papel' && computerPlay == 'piedra'){
            this.pushToHistory('ganaste')
            //console.log('ganaste');
        }else if (myPlay == 'tijera' && computerPlay == 'papel'){
            this.pushToHistory('ganaste')
            //console.log('ganaste');
        }else {
            this.pushToHistory('perdiste')
            //console.log('perdiste');
        }

    },

            
    pushToHistory(game){
        //console.log(game);
        
        const cs = this.getState()
        cs.history.push(game)
        this.setState(cs)
    }, */

    getState(){
        return this.data
    },
    setState(newState){
        this.data = newState
        for (const cb of this.listeners) {
            cb()
            
        }
        const {name, playerId} = newState
        /* localStorage.setItem("saved-id", JSON.stringify({name,playerId})) */
        console.log('Soy el state, he cambiado', this.data);
    },
    subscribe(callback){
        this.listeners.push(callback)
    },

}

export { state }