const resolvers = {
  rich_text: blok => {
    var result = ""
    blok.text.content.map(item => (result += `${resolve(item)}`))
    return result
  },
  paragraph: item => {
    var result = ""
    if (item.content != null) {
      item.content.map(i => (result += `${resolve(i)}\n`))
    }
    return `${result}`
  },
  list_item: item => {
    var result = ""
    item.content.map(i => {
      result += resolve(i)
    })
    return result
  },
  bullet_list: item => {
    var result = ""
    item.content.map(i => (result += `\n\t- ${resolve(i)}`))
    return `${result}\n`
  },
  text: item => item.text,
}

const resolve = item =>
  resolvers[item.type] != null ? resolvers[item.type](item) : ""

const resolveComponent = blok =>
  resolvers[blok.component] != null ? resolvers[blok.component](blok) : ""

function blocksToText(blocks, maxLength = null) {
  var result = ""

  blocks.forEach((blok, index, array) => {
    result += resolveComponent(blok)
  })

  if (maxLength != null && result.length > maxLength) {
    result = `${result.substring(0, maxLength)}...`
  }

  return result
}

module.exports = {
  blocksToText,
}
