const formatDateString = timestamp =>
  timestamp.split("T")[0].split("-").reverse().join(".")

const padNum = string => ("" + string).padStart(2, "0")

const formatDateNow = () => {
  const date = new Date()
  return `${padNum(date.getDate().toString())}.${padNum(
    date.getMonth() + 1
  ).toString()}.${date.getFullYear().toString()}`
}

const removeEscape = str => {
  const escChars = ["\n", `\"`]
  var result = str
  escChars.map(char => (result = result.replaceAll(char, "")))
  return result
}

module.exports = { formatDateString, formatDateNow, removeEscape }
