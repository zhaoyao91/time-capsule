import { EditorState, convertToRaw, convertFromRaw } from 'draft-js'
import { isEmpty } from 'lodash/fp'

export function createEmptyEditorState () {
  return EditorState.createEmpty()
}

export function convertEditorStateToRaw (editorState) {
  return convertToRaw(editorState.getCurrentContent())
}

export function convertRawToEditorState (raw) {
  return EditorState.createWithContent(convertFromRaw(raw))
}