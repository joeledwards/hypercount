const Redis = require('ioredis')

const client = new Redis({
  host: 'redis'
})

const logName = 'hyper-log'
const max = 10000
let reference

async function run () {
  try {
    reference = new Set()
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
    const diff = count - reference.size
    const pct = (Math.abs(diff) / count * 100).toFixed(1)
    console.log(`HLL=${count} REF=${reference.size} DIFF=${diff} PCT=${pct}%`)
    run()
  }
}

client.on('ready', run)
