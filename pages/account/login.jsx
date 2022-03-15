import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { alertService } from '../../services/alert.service';
import { Layout } from '../../components/account/layout';
import { Link } from '../../components/link';
import { useEffect } from 'react';
import { gql, useMutation } from '@apollo/client';

export default Login;


const QUERY = gql`
  mutation signup($name: String!, $password: String!) {
    signup(input: {name: $name, password: $password}) {
      name
      id
    }
  }
  `;

function Login() {
  const router = useRouter();

  // from validation rules
  const validationSchema = Yup.object().shape({
    username: Yup.string().required('Username is required'),
    password: Yup.string().required('Password is required')
  });
  const formOptions = { resolver: yupResolver(validationSchema) };

  // get functions to build form with useForm() hook
  const { register, handleSubmit, formState } = useForm(formOptions);
  const { errors } = formState;
  const [signup, { data, loading, error }] = useMutation(QUERY);

  if (loading) {
    return <h2><a href="#loading" aria-hidden="true" className="aal_anchor" id="loading"><svg aria-hidden="true" className="aal_svg" height="16" version="1.1" viewBox="0 0 16 16" width="16"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg></a>Loading...</h2>;
  }
  if (error) {
    console.error(error);
    return null;
  }

  const onSubmit = ({username, password}) => {
    event.preventDefault();
    signup({ variables: { name: username, password: password }});
    console.log(data);
    localStorage.setItem('user', JSON.stringify(data));

    router.replace('/') // ここでリダイレクト

    // return userService.login(username, password)
    //   .then(() => {
    //     // get return url from query parameters or default to '/'
    //     const returnUrl = router.query.returnUrl || '/';
    //     router.push(returnUrl);
    //   })
    //   .catch(alertService.error);
  }

  return (
    <Layout>
      <div className="card">
        <h4 className="card-header">Login</h4>
        <div className="card-body">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="form-group">
              <label>Username</label>
              <input name="username" type="text" {...register('username')} className={`form-control ${errors.username ? 'is-invalid' : ''}`} />
              <div className="invalid-feedback">{errors.username?.message}</div>
              </div>
              <div className="form-group">
                <label>Password</label>
                <input name="password" type="password" {...register('password')} className={`form-control ${errors.password ? 'is-invalid' : ''}`} />
                <div className="invalid-feedback">{errors.password?.message}</div>
            </div>
            <button disabled={formState.isSubmitting} className="btn btn-primary">
              {formState.isSubmitting && <span className="spinner-border spinner-border-sm mr-1"></span>}
              Login
            </button>
            <Link href="/account/register" className="btn btn-link">Register</Link>
          </form>
        </div>
      </div>
    </Layout>
  )
}
