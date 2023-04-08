import { useGetUserQuery } from "../../generated/graphql"

export default function useGetUser(){
    const {data, loading, error} = useGetUserQuery();
    return {user: data?.me, userLoading: loading, userError: error}
}