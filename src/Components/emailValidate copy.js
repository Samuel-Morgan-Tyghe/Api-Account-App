import React from "react";
import { useForm } from "react-hook-form";
import isEmail from "validator/lib/isEmail";


export default function App() {
  const { register, handleSubmit, errors, formState } = useForm({
    mode: "onBlur",
  });

  function onSubmit(data) {
    console.log(data);
  }

  return (
    <div style={styles.container}>
      <h4>My Form</h4>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          name="username"
          ref={register({
            required: true,
            minLength: 6,
            maxLength: 20,
            pattern: /^[A-Za-z]+$/i,
          })}
          style={{ ...styles.input, borderColor: errors.username && "red" }}
          placeholder="Username"
        />
        <input
          name="email"
          ref={register({
            required: true,
            validate: (input) => isEmail(input),
          })}
          style={{ ...styles.input, borderColor: errors.email && "red" }}
          placeholder="Email"
        />
        <input
          name="password"
          ref={register({
            required: true,
            minLength: 6,
          })}
          style={{ ...styles.input, borderColor: errors.password && "red" }}
          placeholder="Password"
        />
        <button type="submit" disabled={formState.isSubmitting}>
          Submit
        </button>
      </form>
    </div>
  );
}