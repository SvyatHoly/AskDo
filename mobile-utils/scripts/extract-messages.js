const Glob = require('fast-glob')
const fs = require('fs')
const path = require('path')
const { transformFileSync } = require('@babel/core')

const args = process.argv.slice(2)
const extractArg = (index, message) => {
  const value = args[index]
  if (value == null) {
    console.error(message)
    process.exit(8)
  }
  return value
}

const source = extractArg(0)
const output = extractArg(1)

const files = Glob.sync(source, {
  ignore: '**/*.d.ts',
})

function transform(file) {
  const result = []
  transformFileSync(file, {
    plugins: [['formatjs', { onMsgExtracted: (_, messages) => result.push(...messages) }]],
  })

  return result
}

;(function main() {
  let messages = []

  for (const file of files) {
    messages = messages.concat(transform(file, messages))
  }
  const json = {}

  for (const { id, defaultMessage } of messages) {
    if (json[id]) {
      throw new Error(`Duplicate id found: ${id}`)
    }

    json[id] = defaultMessage
  }

  const outputPath = path.join(process.env.PWD, output)
  fs.mkdirSync(path.dirname(outputPath), { recursive: true })
  fs.writeFileSync(outputPath, JSON.stringify(json, null, 2))
  console.log(`Output has been saved in ${outputPath}`)
})()
