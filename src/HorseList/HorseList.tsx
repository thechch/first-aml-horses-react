import React, { FC } from "react";

import { Page } from "../Page";
import { Button } from "../Button";

import { State } from "../types";

import "./HorseList.css";

type HorseListProps = {
  isLoading: boolean;
  horses: State["horses"];
};

export const HorseList: FC<HorseListProps> = ({ horses }) => {
  return (
    <Page header="My Horses">
      <HorseListWrapper>
        {horses.map(({ id, name }) => (
          <HorseListItem key={id}>
            <HorseListItemHeader>
              <Button className="HorseListButton">{name}</Button>
            </HorseListItemHeader>
          </HorseListItem>
        ))}
      </HorseListWrapper>
    </Page>
  );
};

const HorseListWrapper: FC = ({ children, ...props }) => (
  <ul className="HorseListWrapper" {...props}>
    {children}
  </ul>
);

const HorseListItem: FC = ({ children, ...props }) => (
  <li className="HorseListItem" {...props}>
    {children}
  </li>
);

const HorseListItemHeader: FC = ({ children, ...props }) => (
  <h2 className="HorseListItemHeader" {...props}>
    {children}
  </h2>
);
