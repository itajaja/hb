let GID = 0

export default function gid(): string {
  return  (++GID).toString()
}
