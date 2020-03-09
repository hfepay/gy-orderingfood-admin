export function firstWordToUpperCase(str) {
  return str.replace(/^./, function(s) { return s.toUpperCase() })
}
