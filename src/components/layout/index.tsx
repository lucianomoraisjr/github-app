import React, { ReactNode } from "react";
import { Header } from "../header";

import * as S from "./styled";

interface ILayoutProps {
    children : ReactNode
}

const Layout = ({ children }:ILayoutProps) => {
  return (
    <S.WrapperLayout>
      <Header />
      {children}
    </S.WrapperLayout>
  );
};

export default Layout;
