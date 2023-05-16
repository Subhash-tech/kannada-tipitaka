export const getFileExtension = (filename) => {
  let ext = /^.+\.([^.]+)$/.exec(filename)
  return ext == null ? '' : ext[1]
}

