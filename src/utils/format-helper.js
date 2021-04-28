const formatDateString = timestamp =>
  timestamp.split("T")[0].split("-").reverse().join(".")

const padNum = string => ("" + string).padStart(2, "0")

const formatDateNow = () => {
  const date = new Date()
  return `${padNum(date.getDate())}.${padNum(
    date.getMonth() + 1
  )}.${date.getFullYear()}`
}

module.exports = { formatDateString, formatDateNow }
