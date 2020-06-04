import React, { FC, useEffect } from "react";

import { Page } from "../Page";
import { HorseForm } from "../HorseForm";

import { FormValues, Status } from "../types";

const text = {
  header: "Create Horse",
  creatingFailure:
    "Can not create horse. Please see console message for details",
  creatingSuccess: "Horse was successfully created",
};

type CreateHorseProps = {
  status: Status;
  createHorse: (formData: FormValues) => void;
  routing: {
    goToListPage: VoidFunction;
  };
};

export const CreateHorse: FC<CreateHorseProps> = ({
  status,
  routing,
  createHorse,
}) => {
  const isSaving = status === "saving";
  const isSavingSuccess = status === "savingSuccess";
  const isSavingFailure = status === "savingFailure";

  useEffect(() => {
    if (isSavingFailure) {
      alert(text.creatingFailure);
    }
  }, [isSavingFailure]);

  useEffect(() => {
    if (isSavingSuccess) {
      alert(text.creatingSuccess);
      routing.goToListPage();
    }
  }, [isSavingSuccess, routing]);

  return (
    <Page header={text.header}>
      <HorseForm onSubmit={createHorse} isSaving={isSaving} />
    </Page>
  );
};
