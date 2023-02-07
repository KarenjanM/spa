import LoginForm from "../components/forms/LoginForm";

const tokenCreate = /* GraphQL */`
mutation tokenCreate($email: String!, $password: String!){
    tokenCreate(audience: "my-little-secret", email: $email, password: $password){
      token
      refreshToken
    }
  }
`

const tokenVerify = /* GraphQL */`
mutation tokenVerify($token: String!){
    tokenVerify(token: $token){
      isValid
    }
  }
`

export default function Login(){
    return(
        <div>
        <LoginForm />
        </div>
    )
}

