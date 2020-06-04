import React, { FC, useEffect, useState } from "react";

import { Page } from "../Page";
import { Button, TextButton } from "../Button";
import { ButtonGroup } from "../ButtonGroup";

import { useClientPagination } from "../customHooks";

import { State, Status } from "../types";

import "./HorseList.css";

const NUMBER_OF_HORSES_ON_PAGE = 10;

const text = {
  header: "My Horses",
  previousButton: `Previous ${NUMBER_OF_HORSES_ON_PAGE} horses`,
  nextButton: `Next ${NUMBER_OF_HORSES_ON_PAGE} horses`,
  loading: "Loading...",
  loadingFailure: "Can not load horses. Please see console message for details",
};

type HorseListProps = {
  status: Status;
  horses: State["horses"];
  fetchHorses: VoidFunction;
};

export const HorseList: FC<HorseListProps> = ({
  horses,
  status,
  fetchHorses,
}) => {
  const isLoading = status === "loading";
  const isLoadingFailure = status === "loadingFailure";

  useEffect(() => {
    fetchHorses();
  }, [fetchHorses]);

  useEffect(() => {
    if (isLoadingFailure) {
      alert(text.loadingFailure);
    }
  }, [isLoadingFailure]);

  const {
    currentPageData: currentHorses,
    isFirstPage,
    isLastPage,
    nextPage,
    previousPage,
  } = useClientPagination(NUMBER_OF_HORSES_ON_PAGE, horses);

  return (
    <Page header={text.header}>
      {isLoading && <p>{text.loading}</p>}
      {!isLoading && (
        <HorseListWrapper>
          {currentHorses.map(({ id, name }) => (
            <HorseListItem key={id}>
              <HorseListItemHeader>
                <Button className="HorseListButton">{name}</Button>
              </HorseListItemHeader>
            </HorseListItem>
          ))}
        </HorseListWrapper>
      )}
      <ButtonGroup>
        <TextButton onClick={previousPage} disabled={isFirstPage}>
          {text.previousButton}
        </TextButton>
        <TextButton onClick={nextPage} disabled={isLastPage}>
          {text.nextButton}
        </TextButton>
      </ButtonGroup>
    </Page>
  );
};

const HorseListWrapper: FC = ({ children, ...props }) => (
  <ul {...props} className="HorseListWrapper">
    {children}
  </ul>
);

const HorseListItem: FC = ({ children, ...props }) => (
  <li {...props} className="HorseListItem" data-testid="horse-list-item">
    {children}
  </li>
);

const HorseListItemHeader: FC = ({ children, ...props }) => (
  <h2 {...props} className="HorseListItemHeader">
    {children}
  </h2>
);
