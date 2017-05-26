import loadImage from 'blueimp-load-image'

import fileUtils from './file'

export default {
  /**
   * ensure image width is within given max width
   * note: this will change image to jpg type
   * @async
   * @param file
   * @param maxWidth
   * @returns file
   */
  ensureMaxWidth(file, maxWidth) {
    return new Promise((resolve, reject) => {
      loadImage(file, (canvas) => {
        if (canvas.type === 'error') {
          reject(canvas)
        }
        else {
          canvas.toBlob((blob) => {
            blob.name = fileUtils.changeExtension(file.name, '.jpg')
            resolve(blob)
          }, 'image/jpeg')
        }
      }, {
        maxWidth: maxWidth,
        canvas: true
      })
    })
  }
}