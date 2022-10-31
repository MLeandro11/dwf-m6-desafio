import {rtdb} from "./db"
const API_BASE_URL = "http://localhost:4000"
const state = {
    data: {
        name:"",
        playerId:"",
        opponentId:"",
        roomId:"",
        rtdbRoomId:"",
        currentGame:{
            playerOne:{},
            playerTwo:{}
        },
      },
    listeners:[],
    init(){
        const playerData:any = localStorage.getItem('player-data')
        
        if (!playerData) {
            return
        } else {
            const cs= this.getState()
            const data = JSON.parse(playerData)
            cs.name = data.name
            cs.playerId = data.playerId
            this.setState(cs)
            
        }
    },
    listenDatabase() {
        // Connection with RTDB
        const {rtdbRoomId,playerId} = this.getState()
        const rtdbRef = rtdb.ref("/playrooms/" + rtdbRoomId);
        
        rtdbRef.on("value", (snapshot) => {
            const cs = this.getState();
            /* if (snapshot.child("currentGame").numChildren() !== 2){
                return console.log(snapshot.val());
                
            } */
            snapshot.child("currentGame").forEach((childSnapshot)=> {
                const key = childSnapshot.key;
                const childData = childSnapshot.val();
                if (key !== playerId) {
                    cs.currentGame.playerTwo =childData
                }
                if (key == playerId) {
                    cs.currentGame.playerOne = childData
                }
            });
            this.setState(cs)
        })
    },
      setData(data:{name:string,roomId?:number}){
        //console.log(data);
        const currentState = this.getState()
        currentState.name = data.name
        currentState.roomId = data.roomId
        this.setState(currentState)
    },
    registerPlayer(callback){
        const cs = this.getState()
        const {name} = cs
        fetch("/register",{
                method: 'post',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({name})
                
            })
            .then(res => res.json())
            .then(data => {
                const id = data.id
                cs.playerId = id
                this.setState(cs)
                callback()
            })
    },
    askNewRoom(callback){
        const cs = this.getState()
        const {playerId,name} = cs
        if (playerId) {
            fetch("/playrooms",{
                method: 'post',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({playerId,name})
                
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
    accessToRoom(callback){
        const cs = this.getState()
        const {playerId,roomId} = cs
        if (playerId && roomId) {
            fetch(`/playrooms/${roomId}?playerId=${playerId}`)
            .then(res => res.json())
            .then(data => {
                //console.log(data);
                const {rtdbRoomId} = data
                cs.rtdbRoomId = rtdbRoomId
                this.setState(cs)
                this.listenDatabase()
                callback()
            })
        }else{
            console.error("error al acceder al room")
        }
    },
    updateGame(data){
        const cs = this.getState()
        const {playerId, rtdbRoomId} = cs
        fetch(`/playrooms/games/${rtdbRoomId}/${playerId}` ,{
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)

        })
    }, 
    /* setMove(myMove, computerMove){
        const cs = this.getState()
        cs.currentGame.myPlay = myMove
        cs.currentGame.computerPlay = computerMove
        //this.whoWins(myMove, computerMove)
        this.setState(cs)
        
    }, */
    
    
    whoWins(playerOne, playerTwo){
        
        if (playerOne == playerTwo) {        
            this.pushToHistory('empate')
            //console.log('empate');
        } else if (playerOne == 'piedra' && playerTwo == 'tijera'){
            this.pushToHistory('ganaste')
            //console.log('ganaste');
        } else if (playerOne == 'papel' && playerTwo == 'piedra'){
            this.pushToHistory('ganaste')
            //console.log('ganaste');
        }else if (playerOne == 'tijera' && playerTwo == 'papel'){
            this.pushToHistory('ganaste')
            //console.log('ganaste');
        }else {
            this.pushToHistory('perdiste')
            //console.log('perdiste');
        }
    },
          
    pushToHistory(game){
        const cs = this.getState()
        const {playerId, rtdbRoomId} = cs
        fetch(`/playrooms/history/${rtdbRoomId}/${playerId}` ,{
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({result:game})

        })
    },

    getState(){
        return this.data
    },
    setState(newState){
        this.data = newState
        for (const cb of this.listeners) {
            cb()
            
        }
        const {name, playerId} = newState
        localStorage.setItem("player-data", JSON.stringify({name,playerId}))
        console.log('Soy el state, he cambiado', this.data);
    },
    subscribe(callback){
        this.listeners.push(callback)
    },

}

export { state }