interface IuserSelector {
  auth: {
    userData: {
      name: string
    }
  }
}

export const userSelector = ({
  auth: {
    userData: {
      name
    }
  }
}: IuserSelector) => ({
  name
})
