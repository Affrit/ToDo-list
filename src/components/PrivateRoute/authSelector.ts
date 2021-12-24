interface IAuthSelector {
  auth: {
    isAuth: boolean
    error: string
  }
}

export const authSelector = ({
  auth: {
    isAuth,
    error
  } }: IAuthSelector) => ({
    isAuth,
    error
  })
  