import React, { useState } from 'react';
import { gql, useMutation } from "@apollo/client";

const QUERY = gql`
mutation createCat($name: String!, $breed: String!, $age: Int!) {
  createCat(createCat:{age: $age,breed: $breed,name: $name}) {
      name
      age
    }
  }
`;

interface CreateCatInterface {
  name: string;
  breed: string;
  age: number;
}

export default function CreateCat() {
  const [values, setValues] = useState<CreateCatInterface>({
    name: '',
    breed: '',
    age: 0,
  });

  const [createCat, { data, loading, error }] = useMutation(QUERY);

  if (loading) {
    return <h2><a href="#loading" aria-hidden="true" className="aal_anchor" id="loading"><svg aria-hidden="true" className="aal_svg" height="16" version="1.1" viewBox="0 0 16 16" width="16"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg></a>Loading...</h2>;
  }
  if (error) {
    console.error(error);
    return null;
  }

  const handleSubmit = event => {
    event.preventDefault();
    console.log(values);
    createCat({ variables: { age: Number(values.age), breed: values.breed, name: values.name }});
  }

  const handleChange: (name) => (event) => void = (name) => (event) => {
    const newValues = {
      ...values,
      [name]: event.target.value
    }
    setValues(newValues);
  };

  return (
    <>
      <h2>Create New Cat</h2>
      <form onSubmit={handleSubmit} >
        Name: <input type='text' value={values.name} onChange={handleChange('name')} />
        <br />
        Breed: <input type='text' value={values.breed} onChange={handleChange('breed')} />
        <br />
        Age: <input type='number' value={values.age} onChange={handleChange('age')} />
        <button type="submit">Create Cat</button>
      </form>
    </>
  );
}
