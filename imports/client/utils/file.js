export default {
  changeBasename(filename, newBasename) {
    return newBasename + filename.substr(filename.lastIndexOf('.'))
  },

  changeExtension(filename, newExtension) {
    return filename.substr(0, filename.lastIndexOf('.')) + newExtension
  }
}