import * as yup from 'yup'
export const validatePost = yup.object().shape({
  body: yup.object({
    title: yup.string().required()
  })
})