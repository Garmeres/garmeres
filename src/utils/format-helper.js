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
  const escChars = ["\n", `"`]
  var result = str != null ? str : ""
  escChars.forEach(c => {
    result = result.split(c).join("")
  })
  return result
}

module.exports = { formatDateString, formatDateNow, removeEscape }
