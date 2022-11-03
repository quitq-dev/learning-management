export const resolveErrorMessage = (error: any) => {
  if (process.env.ENV?.toLowerCase() === 'prod') {
    return 'oops something went wrong'
  }
  return error?.message || ''
}