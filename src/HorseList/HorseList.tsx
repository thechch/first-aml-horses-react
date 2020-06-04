import React, { FC, useEffect } from "react";

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
  createHorse: "Create Horse",
};

type HorseListProps = {
  status: Status;
  horses: State["horses"];
  fetchHorses: VoidFunction;
  routing: {
    goToCreatePage: VoidFunction;
  };
};

export const HorseList: FC<HorseListProps> = ({
  horses,
  status,
  fetchHorses,
  routing,
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
    <Page
      header={text.header}
      headerButton={
        <TextButton
          data-testid="create-horse-button"
          onClick={routing.goToCreatePage}
        >
          {text.createHorse}
        </TextButton>
      }
    >
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

const HorseListWrapper: FC = (props) => (
  <ul
    {...props}
    className="HorseListWrapper"
    data-testid="horse-list-wrapper"
  />
);

const HorseListItem: FC = (props) => (
  <li {...props} className="HorseListItem" data-testid="horse-list-item" />
);

const HorseListItemHeader: FC = ({ children, ...props }) => (
  <h2
    {...props}
    className="HorseListItemHeader"
    data-testid="horse-list-item-header"
  >
    {children}
  </h2>
);
