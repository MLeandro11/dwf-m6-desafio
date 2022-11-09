import { firestore, rtdb} from './db'
import * as express from "express"
import { nanoid } from 'nanoid'
import * as cors from "cors"
import * as path from "path"


const port = process.env.PORT || 4000

const app = express()
app.use(cors())
app.use(express.json())

const router = express.Router();

const playersCollectionRef = firestore.collection('players')
const playroomsCollectionRef = firestore.collection('playrooms')

router.post('/register', (req, res)=>{
    const {name} = req.body
    playersCollectionRef.add({name})
    .then((newPlayerRef)=>{
        res.json({
            id: newPlayerRef.id,
            new: true
        })
    })
    
})


router.post("/playrooms", (req, res)=>{
    const {playerId,name} = req.body
    //console.log(playerId);
    playersCollectionRef
    .doc(playerId.toString())
    .get()
    .then((doc)=>{
        if (doc.exists) {
            const roomId = nanoid()
           const playroomRef = rtdb.ref("playrooms/" + roomId + "/currentGame/" + playerId)
           playroomRef.set({
                choice: "",
                name:name,
                history:{},
                online: true,   
                start: false,
            },
            ).then(()=>{
                const roomIdShort = nanoid(6).toLowerCase()
            playroomsCollectionRef
            .doc(roomIdShort.toString()).set({
                rtdbRoomId: roomId
            }).then(()=>{
                res.json({
                    id: roomIdShort.toString() 
                })
                
            })
        })
    }else{
        res.status(401).json({
            message: "no existis"
        })
    }
} )

})


router.get("/playrooms/:roomId", (req, res)=>{
    const {playerId} = req.query
    const {roomId} = req.params
    playersCollectionRef
    .doc(playerId.toString())
    .get()
    .then((doc)=>{
        if (doc.exists) {
            playroomsCollectionRef.doc(roomId).get().then(snap=>{
            const data = snap.data()
            res.json(data)
          })
        }else{
            res.status(401).json({
                message: "no existis"
            })
        }
    } )
})

router.post("/playrooms/history/:roomId/:playerId", (req, res)=>{
    const {playerId,roomId} = req.params 
    const newResult = req.body
    const playerRef = rtdb.ref("/playrooms/"+roomId+"/currentGame/"+playerId);
    playerRef.child("history").push(newResult.result, ()=>{
        res.json({message:"todo ok"})

    });
    
})

router.patch('/playrooms/games/:roomId/:playerId', (req, res)=>{
    const {playerId,roomId} = req.params 
    const changes = req.body
    const playerRef = rtdb.ref("/playrooms/"+roomId+"/currentGame/"+playerId);
    playerRef.update(changes, ()=>{
        res.json({message:"todo ok"})

    });
    
})



app.use('/', router)
app.use(express.static('dist'))

const rutaRelativa = path.resolve(__dirname, "../dist/",  "index.html");
app.get("*", (req, res)=>{
    res.sendFile(rutaRelativa)
})
 
 app.listen(port, () => {
     console.log(`listening on port ${port}`)
   })

