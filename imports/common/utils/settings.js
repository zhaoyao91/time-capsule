export function must (value) {
  if (value === undefined) {
    throw new Error('some settings field is required.')
  }
  return value
}

export function need (value) {
  if (value === undefined) {
    console.warn('some settings field is needed.', new Error().stack)
  }
  return value
}