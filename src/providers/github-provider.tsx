import React, { createContext, ReactNode, useCallback, useState } from "react";
import api from "../services/api";

interface IUser {
  id: string,
  avatar: string,
  login: string,
  name: string,
  html_url: string,
  blog: string,
  company: string,
  location: string,
  followers: number,
  following: number,
  public_gists: number,
  public_repos: number,
}

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
  githubState?: IGithubState,
  getUser: (username: string) => void
  getUserRepos: (username: string) => void
  getUserStarred: (username: string) => void

}



export const GithubContext = createContext({} as AuthContexData);

const GithubProvider = ({ children }: IGithubProvider) => {
  const [githubState, setGithubState] = useState<IGithubState>()


  const getUser = (username: string) => {

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
  const getUserRepos = (username: string) => {
    api.get(`users/${username}/repos`).then(({ data }) => {
      console.log("data: " + JSON.stringify(data));
      setGithubState((prevState) => ({
        ...prevState,
        repositories: data,
      }));
    });
  };

  const getUserStarred = (username: string) => {
    api.get(`users/${username}/starred`).then(({ data }) => {
      console.log("data: " + JSON.stringify(data));
      setGithubState((prevState) => ({
        ...prevState,
        starred: data,
      }));
    });
  };
  const contextValue = {
    githubState,
    getUser,
    getUserRepos,
    getUserStarred
  };
  return (
    <GithubContext.Provider value={contextValue}>
      {children}
    </GithubContext.Provider>
  );

}
export default GithubProvider