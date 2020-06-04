import React, { FC, ReactNode } from "react";

import "./Page.css";

type PageProps = {
  header: ReactNode;
  headerButton?: ReactNode;
};

export const Page: FC<PageProps> = ({ children, header, headerButton }) => (
  <article className="Page">
    <HeaderWrapper>
      <Header>{header}</Header>
      {headerButton}
    </HeaderWrapper>
    {children}
  </article>
);

const HeaderWrapper: FC = ({ children }) => (
  <div className="HeaderWrapper" data-testid="page-header-wrapper">
    {children}
  </div>
);

const Header: FC = ({ children, ...props }) => (
  <h1 {...props} className="Header" data-testid="page-header">
    {children}
  </h1>
);
