import { useState } from "react";
import Layout from "../components/layout";
import Form from "../components/form";
import fetchJson, { FetchError } from "../lib/fetch-json";
import useUser from "../lib/use-user";
import { login } from "../lib/users";

export default function Login() {
  const { mutateUser } = useUser({
    redirectTo: "profile-sg",
    redirectIfFound: true,
  });

  const [errorMsg, setErrorMsg] = useState("");

  return (
    <Layout>
      <div className="login">
        <Form errorMessage={errorMsg} onSubmit={async function handleSubmit(event){
          event.preventDefault();

          const body = {
            username: event.currentTarget.username.value,
            password: event.currentTarget.password.value,
          };

          try {
            mutateUser(
              await fetchJson("/api/login", {
                method: "POST",
                headers: { "Content-type": "application/json" },
                body: JSON.stringify(body),
              }),
            );
            await login(body.username, body.password);
          } catch (error) {
            if (error instanceof FetchError) {
              setErrorMsg(error.data.message);
            } else {
              console.error("An unexpected error happened:", error);
            }
          }
        }}
        />
      </div>
      <style jsx>{`
        .login {
          max-width: 21rem;
          margin: 0 auto;
          padding: 1rem;
          border: 1px solid #ccc;
          border-radius: 4px;
        }
      `}</style>
    </Layout>
  );
}
