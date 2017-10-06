import 'source-map-support/register'
import _ from 'lodash'
import parser from 'esprima'
import { render } from 'prettyjson'
import fs from 'fs'
import path from 'path'

var objectAST = parser.parse(fs.readFileSync(path.join(__dirname, '../tests/program.js')))
console.log(render(objectAST))
