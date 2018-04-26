const Redis = require('ioredis')

const client = new Redis({
  host: 'redis'
})

const logName = 'hyper-log'
const max = 100
const reference = new Set()

async function run () {
  try {
    await client.flushdb()
    step(max)
  } catch (error) {
    console.error(error)
  }
}

async function step (remaining) {
  if (remaining > 0) {
    const key = `${(Math.random() * max) | 0}`
    reference.add(key)
    await client.pfadd(logName, key)
    step(remaining - 1)
  } else {
    const count = await client.pfcount(logName)
    console.log(`HLL=${count} REF=${reference.size}`)
  }
}

client.on('ready', run)
