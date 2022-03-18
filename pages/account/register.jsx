import { userService } from "../../services/user.service";
import { alertService } from "../../services/alert.service";
import { useRouter } from "next/router";
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { Link } from '../../components/link';
import { Layout } from '../../components/account/layout';
import { useForm } from "react-hook-form";

export default function Register() {
  const router = useRouter();

  const validationSchema = Yup.object().shape({
    userName: Yup.string().required('First Name is required')
  });
  const formOptions = { resolver: yupResolver(validationSchema) };

  const { register, handleSubmit, formState } = useForm(formOptions);
  const { errors } = formState;

  function onSubmit(user) {
    return userService.register(user)
      .then(() => {
        alertService.success('Registration successful', { keepAfterRouteChange: true} );
        router.push('login');
      })
      .catch(alertService.error);
  }

  return (
    <Layout>
      <div className="card">
        <h4 className="card-header">Register</h4>
        <div className="card-body">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="form-group">
              <label>User Name</label>
              <input name="userName" type="text" {...register('userName')} className={`form-control ${errors.firstName ? 'is-invalid' : ''}`} />
              <div className="invalid-feedback">{errors.userName?.message}</div>
            </div>
            <div className="form-group">
              <label>Password</label>
              <input name="password" type="password" {...register('password')} className={`form-control ${errors.password ? 'is-invalid' : ''}`} />
              <div className="invalid-feedback">{errors.password?.message}</div>
            </div>
            <button disabled={formState.isSubmitting} className="btn btn-primary">
              {formState.isSubmitting && <span classNmae="spinner-border spinner-border-sm mr-1"></span>}
              Register
            </button>
            <Link href="/account/login" className="btn btn-link">Cancel</Link>
          </form>
        </div>
      </div>
    </Layout>
  )
}
