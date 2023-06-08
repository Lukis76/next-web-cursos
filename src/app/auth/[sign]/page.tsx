import { LoginForm } from './login'
import { RegisterForm } from './register'

enum SignType {
  login = 'login',
  register = 'register',
}

type params = {
  sign: SignType
}

interface ISignProps {
  params: params
}

const Sign = ({ params }: ISignProps) => {
  if (params.sign === SignType.login) {
    return <LoginForm />
  } else if (params.sign === SignType.register) {
    return <RegisterForm />
  }

  return (
    <div>
      <h1>Not Found</h1>
    </div>
  )
}

export default Sign
