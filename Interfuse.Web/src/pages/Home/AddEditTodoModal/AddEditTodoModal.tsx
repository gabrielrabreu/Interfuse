// AddEditTodoModal.tsx
import React, { useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import {
  Button,
  FormField,
  Grid,
  Input,
  Typography,
} from "@gabrielrabreu/sage-react";
import { TodoDto } from "../../../interfaces/TodoDto";
import styles from "./AddEditTodoModal.module.scss";
import { toast } from "react-toastify";

interface AddEditTodoModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: TodoDto) => Promise<void>;
  defaultValue?: TodoDto | null;
}

interface TodoFormInput {
  title: string;
  description: string;
  priority: number;
  is_done: boolean;
}

const AddEditTodoModal: React.FC<AddEditTodoModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  defaultValue,
}) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<TodoFormInput>({
    mode: "onBlur",
    defaultValues: {
      title: "",
      description: "",
      priority: 0,
      is_done: false,
    },
  });

  useEffect(() => {
    if (defaultValue) {
      reset(defaultValue);
    }
  }, [defaultValue, reset]);

  const submitHandler: SubmitHandler<TodoFormInput> = async (
    values: TodoFormInput
  ) => {
    try {
      await onSubmit(values as TodoDto);
      reset();
      onClose();
    } catch (error) {
      let errorMessage = error;
      if (error instanceof Error) {
        errorMessage = error.message;
      }
      toast.error(errorMessage as React.ReactNode);
    }
  };

  return (
    <>
      {isOpen && (
        <div className={styles.modalBackdrop}>
          <div className={styles.modalContent}>
            <Typography variant="heading">
              {defaultValue ? "Edit Todo" : "Add Todo"}
            </Typography>
            <form onSubmit={handleSubmit(submitHandler)}>
              <FormField
                name="title"
                label="Title"
                control={control}
                rules={{ required: "Title is required" }}
                error={errors.title}
                render={({ value, onChange, onBlur }) => (
                  <Input
                    type="text"
                    value={value}
                    onChange={onChange}
                    onBlur={onBlur}
                  />
                )}
              />
              <FormField
                name="description"
                label="Description"
                control={control}
                rules={{ required: "Description is required" }}
                error={errors.description}
                render={({ value, onChange, onBlur }) => (
                  <Input
                    type="text"
                    value={value}
                    onChange={onChange}
                    onBlur={onBlur}
                  />
                )}
              />
              <FormField
                name="priority"
                label="Priority"
                control={control}
                rules={{ required: "Priority is required" }}
                error={errors.priority}
                render={({ value, onChange, onBlur }) => (
                  <Input
                    type="number"
                    value={value}
                    onChange={onChange}
                    onBlur={onBlur}
                  />
                )}
              />
              <FormField
                name="is_done"
                label="Is Done"
                control={control}
                error={errors.is_done}
                render={({ value, onChange, onBlur }) => (
                  <input
                    type="checkbox"
                    checked={value}
                    onChange={(e) => onChange(e.target.checked)}
                    onBlur={onBlur}
                  />
                )}
              />
              <Grid cols={2}>
                <Button type="submit" text="Submit" />
                <Button type="button" text="Close" onClick={onClose} />
              </Grid>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default AddEditTodoModal;
