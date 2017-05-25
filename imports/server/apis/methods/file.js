import { Meteor } from 'meteor/meteor'
import { check } from 'meteor/check'

import FileService from '../../services/file'

Meteor.methods({
  /**
   * build file upload token for time-capsule content image
   * @param filename
   * @returns {{key: string, token: string}} # user can only upload file with given key(object name)
   */
  'File.buildUploadTokenForTimeCapsuleContentImage'(filename) {
    check(filename, String)

    return FileService.buildUploadTokenForTimeCapsuleContentImage(filename)
  }
})