import ContextStrategy from "./base/contextStrategy.js"
import MongoDBStrategy from "./strategies/mongoDBStrategy.js"
import PostgresStrategy from "./strategies/postgresStrategy.js"

const postgresConnectionString = 'postgres://guilherme:test@localhost:5433/heroes'
const postgresStrategy = new ContextStrategy(new PostgresStrategy(postgresConnectionString))
const result = await postgresStrategy.connect()
console.log('result', result)

const data = [{
    name: 'erickwendel',
    type: 'transaction',
},
{
    name: 'guilherme',
    type: 'activityLog'
}
]