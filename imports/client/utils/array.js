export default {
  ensureArray(target) {
    if (target === undefined) return []
    else if (Array.isArray(target)) return target
    else return [target]
  }
}