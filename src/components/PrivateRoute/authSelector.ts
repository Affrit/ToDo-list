interface IAuthSelector {
  auth: {
    isAuth: boolean
  }
}

export const authSelector = ({
  auth: {
    isAuth
  } }: IAuthSelector) => ({
    isAuth
  })
  