import React, { createContext, ReactNode, useCallback, useState } from "react";
import { IUser } from "../interfaces/User";
import api from "../services/api";


interface IGithubState {
    loading?: boolean
    user?: IUser
    repositories?: []
    starred?: []
    hasUser?: boolean
}
interface IGithubProvider {
    children: ReactNode
}

interface AuthContexData {
    githubState?:IGithubState,
    getUser:(username:string)=>void    

}



export const GithubContext = createContext({} as AuthContexData);

const GithubProvider = ({ children }: IGithubProvider) => {
    const [githubState, setGithubState] = useState<IGithubState>()


    const getUser = (username:string) => {

      console.log('oioi')
        setGithubState((prevState) => ({
            ...prevState,
            loading: !(prevState?.loading),
        }));

        api
        .get(`users/${username}`)
        .then(({ data }) => {
          setGithubState((prevState) => ({
            ...prevState,
            hasUser: true,
            user: {
              id: data.id,
              avatar: data.avatar_url,
              login: data.login,
              name: data.name,
              html_url: data.html_url,
              blog: data.blog,
              company: data.company,
              location: data.location,
              followers: data.followers,
              following: data.following,
              public_gists: data.public_gists,
              public_repos: data.public_repos,
            },
          }));
        })
        .finally(() => {
          setGithubState((prevState) => ({
            ...prevState,
            loading: !(prevState?.loading),
          }));
        });

}
const contextValue = {
    githubState,
    getUser
    
    
  };
return (
    <GithubContext.Provider value={contextValue}>
      {children}
    </GithubContext.Provider>
  );

}
export default GithubProvider