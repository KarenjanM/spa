import RegisterForm from "../components/forms/RegisterForm"

const accountRegister = /* GraphQL */`
mutation accountRegister($input: AccountRegisterInput!) {
    accountRegister(
      input: $input
    ) {
      errors{
        message
      }
      user{
        email
      }
    }
  }
`

export default function Register(){
    return(
        <div>
            <RegisterForm />
        </div>
    )
}