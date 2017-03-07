// TODO add DEV/PROD silence
export default function assert(cond, message) {
  if (!cond) {
    throw new Error(`[ASSERTION ERROR], ${message}`)
  }
}
