import express from 'express';
const app = express()
import minimist from 'minimist';

// CL argument
const args = minimist(process.argv.slice(2));
args['port'];
var port = args.port || 5000 // (default 5000)

app.use(express.json())
app.use(express.urlencoded({extended: true}))

const logging = (req, res, next) => {
    console.log(req.body.number)
    next()
}

const server = app.listen(port, () => {
    console.log('App is running on port %PORT%'.replace('%PORT%', port))
})

// coin fns
function coinFlip() {
    return Math.random() > .5 ? 'heads' : 'tails';
}

function coinFlips(flips) {
    let array = [];
    for (let i=0; i<flips; i++) {
      array[i] = coinFlip();
    }
    return array;
}

function countFlips(array) {
    let h = 0;
    let t = 0;
  
    for (let i = 0; i < array.length; i++) {
      if (array[i] == "heads") {
        h++;
      } else if (array[i] == "tails") {
        t++;
      }
    }
  
    if (h !=0 && t != 0) {
      return {tails: t, heads: h};
    } 
  
    if (h == 0 && t == 0) {
      return {};
    }
    
    if (h == 0) {
      return {tails: t};
    }
    
    if (t == 0) {
      return {heads: h};
    }
}

function flipACoin(call) {
    let flip = coinFlip();
    if (flip == call) {
      return {
        call: call,
        flip: flip,
        result: "win"
      }
      } else {
        return {
          call: call,
          flip: flip,
          result: "lose"
        }
      }
}

// endpoints 
app.get('/app/', (req, res) => {
    res.status(200).end('OK')
    res.type("text/plain")
})

app.get('/app/flip/', (req, res) => {
    var flip = coinFlip()
    res.status(200).json({'flip' : flip})
})

app.get('/app/flips/:number/', (req, res) => {
    var flips = coinFlips(req.params.number)
    res.status(200).json({'raw': flips, 'summary': countFlips(flips)})
})

app.get('/app/flip/call/tails/', (req, res) => {
    var flip = flipACoin('tails')
    res.status(200).json(flip)
})

app.get('/app/flip/call/heads/', (req, res) => {
    var flip = flipACoin('heads')
    res.status(200).json(flip)
})

app.use(function(req, res) {
    res.status(404).send("Endpoint does not exist")
    res.type("text/plain")
})


/*
TESTING STUFF

app.get('/app/echo/:number', (req, res) => {
    res.status(200).json({'message': req.params.number})
})

app.get('/app/echo', (req, res) => {
    res.status(200).json({'message': req.query.number})
})

app.get('/app/echo/', logging, (req, res) => {
    res.status(200).json({'message': req.body.number})
})
*/

// 404

app.use(function(req,res) {
    res.status(404).send("404 Not found")
    res.type("text/plain")
})
