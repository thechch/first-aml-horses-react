import React, {
  FC,
  useState,
  ChangeEventHandler,
  FormEventHandler,
  InputHTMLAttributes,
  LabelHTMLAttributes,
} from "react";

import { PrimaryButton } from "../Button";

import { FieldName, FormValues } from "../types";

import "./HorseForm.css";

const text = {
  submit: "Submit",
  nameValidationError: "Please add a name of your horsy",
  nameLabel: "Name of your horsy",
  namePlaceholder: "How about Tygydymskii Kon'? Or Avelina Petrovna?",
  foodTitle: "What is your horsey likes to eat most? (Optional)",
  foodPlaceholder: "Maybe burgers, idk",
  heightTitle: "How tall? (Optional)",
  heightPlaceholder: "Not sure if 'tall' would be correct here",
  weightTitle: "How heavy in kg? (Optional)",
  weightPlaceholder: "brrr",
};

const initialFormState: FormValues = {
  [FieldName.HorseName]: "",
  [FieldName.FavouriteFood]: "",
  [FieldName.Height]: "",
  [FieldName.Weight]: "",
};

type HorseFormProps = {
  onSubmit: (formData: FormValues) => void;
  isLoading?: boolean;
  isSaving?: boolean;
};

export const HorseForm: FC<HorseFormProps> = ({ onSubmit, isSaving }) => {
  const [form, setForm] = useState(initialFormState);
  const [validationErrors, setValidationErrors] = useState({
    [FieldName.HorseName]: "",
  });
  const { horseName, favouriteFood, height, weight } = form;

  const handleChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    const { name, value } = event.target;

    if (name === FieldName.HorseName) {
      setValidationErrors({ [FieldName.HorseName]: "" });
    }

    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleOnSubmit: FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();

    if (!horseName) {
      setValidationErrors({ [FieldName.HorseName]: text.nameValidationError });
    }

    onSubmit(form);
  };

  return (
    <form
      data-testid="horse-form"
      className="HorseForm"
      onSubmit={handleOnSubmit}
    >
      <Label>
        {text.nameLabel}
        <Input
          data-testid="horse-form-name"
          disabled={isSaving}
          name={FieldName.HorseName}
          type="text"
          value={horseName}
          placeholder={text.namePlaceholder}
          onChange={handleChange}
        />
        {validationErrors.horseName && (
          <Error data-testid="horse-form-name-error">
            {validationErrors.horseName}
          </Error>
        )}
      </Label>
      <Label>
        {text.foodTitle}
        <Input
          disabled={isSaving}
          name={FieldName.FavouriteFood}
          type="text"
          value={favouriteFood}
          placeholder={text.foodPlaceholder}
          onChange={handleChange}
        />
      </Label>
      <Label>
        {text.heightTitle}
        <Input
          disabled={isSaving}
          name={FieldName.Height}
          type="number"
          value={height}
          placeholder={text.heightPlaceholder}
          onChange={handleChange}
        />
      </Label>
      <Label>
        {text.weightTitle}
        <Input
          disabled={isSaving}
          name={FieldName.Weight}
          type="number"
          value={weight}
          placeholder={text.weightPlaceholder}
          onChange={handleChange}
        />
      </Label>
      <PrimaryButton disabled={isSaving} type="submit">
        {text.submit}
      </PrimaryButton>
    </form>
  );
};

const Input: FC<InputHTMLAttributes<HTMLInputElement>> = (props) => (
  <input {...props} className="Input" />
);

const Label: FC<LabelHTMLAttributes<HTMLLabelElement>> = (props) => (
  <label {...props} className="Label" />
);

const Error: FC = (props) => <p {...props} className="Error" />;
