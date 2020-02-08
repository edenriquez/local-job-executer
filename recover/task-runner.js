require('dotenv').config()
let args = process.argv;
const filePath = args.slice(2)[0]
const funcName = args.slice(2)[1]

const existParams = args.slice(2).slice(2, ).join(',')

if (existParams) {
  eval(`require(\"${filePath}\")\.${funcName}(\"${existParams}\")`)
} else {
  eval(`require(\"${filePath}\")\.${funcName}()`)
}
