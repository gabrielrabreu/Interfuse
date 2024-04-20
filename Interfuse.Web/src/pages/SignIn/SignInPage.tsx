import React from "react";
import {
  Button,
  Card,
  FormField,
  Grid,
  Input,
} from "@gabrielrabreu/sage-react";
import { SubmitHandler, useForm } from "react-hook-form";
import { Navigate } from "react-router-dom";
import { toast } from "react-toastify";

import Section from "../../layout/Section/Section";
import { useAuth } from "../../contexts/AuthContext";
import { SignInDto } from "../../interfaces/SignInDto";
import authService from "../../services/AuthService";

import styles from "./SignInPage.module.scss";

const SignInPage: React.FC = () => {
  const { signIn } = useAuth();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInDto>({
    mode: "onBlur",
    defaultValues: {
      userName: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<SignInDto> = async (values: SignInDto) => {
    try {
      const response = await authService.signIn(values);
      signIn(response.accessToken, response.user);
      return <Navigate to="/" />;
    } catch (error) {
      let errorMessage = error;
      if (error instanceof Error) {
        errorMessage = error.message;
      }
      toast.error(errorMessage as React.ReactNode);
    }
  };

  return (
    <div className={styles.signInContainer}>
      <Section>
        <Grid cols={1}>
          <Grid.Item>
            <Card>
              <Card.Title>Sign In</Card.Title>
              <form onSubmit={handleSubmit(onSubmit)}>
                <FormField
                  name="userName"
                  label="UserName"
                  control={control}
                  rules={{ required: "UserName is required" }}
                  error={errors.userName}
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
                  name="password"
                  label="Password"
                  control={control}
                  rules={{ required: "Password is required" }}
                  error={errors.password}
                  render={({ value, onChange, onBlur }) => (
                    <Input
                      type="text"
                      value={value}
                      onChange={onChange}
                      onBlur={onBlur}
                    />
                  )}
                />
                <Button type="submit" text="Submit" />
              </form>
            </Card>
          </Grid.Item>
        </Grid>
      </Section>
    </div>
  );
};

export default SignInPage;
