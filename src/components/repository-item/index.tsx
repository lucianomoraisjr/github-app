import React, { useEffect } from "react";
import * as S from "./styled";

interface IRepositoryItem {
    name:string,
    linkToRepo:string,
    fullName:string 
}

const RepositoryItem = ({ name, linkToRepo, fullName }:IRepositoryItem) => {
 
  
    return (
    <S.Wrapper>
      <S.WrapperTitle>{name}</S.WrapperTitle>
      <S.WrapperFullName>full name:</S.WrapperFullName>
      <S.WrapperLink href={`https://github.com/${linkToRepo}`} target="_blank" rel="noreferrer">
        {fullName}
      </S.WrapperLink>
    </S.Wrapper>
  );
};

export default RepositoryItem;
