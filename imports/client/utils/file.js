export default {
  replaceBasename(filename, newBasename) {
    return newBasename + filename.substr(filename.lastIndexOf('.'))
  },

  replaceExtension(filename, newExtension) {
    return filename.substr(0, filename.lastIndexOf('.')) + newExtension
  }
}