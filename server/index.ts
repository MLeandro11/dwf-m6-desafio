import { firestore, rtdb } from './db'
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
    
    const {playerId} = req.body
    console.log(playerId);
    playersCollectionRef
    .doc(playerId.toString())
    .get()
    .then((doc)=>{
        if (doc.exists) {
           const playroomRef = rtdb.ref("playrooms/" + nanoid())

           playroomRef.set({
            currentGame: [{
                choice: "",
                name:"",
                online: true,
                start: false
            }],
               //dueño
               owner: playerId
            }).then(()=>{
                const roomLongId = playroomRef.key 
                const roomid = 1000 + Math.floor(Math.random() * 999)
            playroomsCollectionRef
            .doc(roomid.toString()).set({
                rtdbRoomId: roomLongId
            }).then(()=>{
                res.json({
                    id: roomid.toString() 
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



app.use('/', router)
app.use(express.static('dist'))

const rutaRelativa = path.resolve(__dirname, "../dist/",  "index.html");
app.get("*", (req, res)=>{
    res.sendFile(rutaRelativa)
})
 
 app.listen(port, () => {
     console.log(`listening on port ${port}`)
   })

