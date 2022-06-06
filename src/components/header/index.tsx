import React, { useState } from "react";
import * as S from "./styled";

export const Header = () => {
   return(
    <header>
    <S.Wrapper>
   <input
     type="text"
     placeholder="Digite o username para pesquisa..."
     
   />
   <button type="submit" >
     <span>Buscar</span>
   </button>
 </S.Wrapper>
</header>
   )
}