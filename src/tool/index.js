export const getInputSize = value => {
  if (!value) {
    return 0
  }
  const charCount = value.split('').reduce((prev, curr) => {
    // 英文字母和数字等算一个字符；这个暂时还不完善；
    if (/[a-z]|[0-9]|[,;.!@#-+/\\$%^*()<>?:"'{}~]/i.test(curr)) {
      return prev + 1
    }
    // 其他的算是2个字符
    return prev + 2
  }, 0)

  // 向上取整，防止出现半个字的情况
  return Math.ceil(charCount / 2)
}
export const nbsp2Space = str => {
  var arrEntities = { nbsp: ' ' }
  return str.replace(/&(nbsp);/gi, function (all, t) {
    return arrEntities[t]
  })
}
