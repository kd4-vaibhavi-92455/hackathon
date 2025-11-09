function createResult(error, data) {
  if (data)
    return { status: 'success', data }
  else
    return { status: 'error', error }
}

module.exports = createResult
