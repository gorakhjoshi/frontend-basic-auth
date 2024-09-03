export const getCookie = (name: string): string | undefined => {
  const value = `; ${document.cookie}`
  const parts = value.split(`; ${name}=`)

  if (parts.length === 2) {
    const cookiePart = parts.pop()
    if (cookiePart) {
      return cookiePart.split(';').shift()
    }
  }

  return undefined // Return `undefined` if the cookie is not found
}
