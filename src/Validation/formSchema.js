// Here goes the schema for the form
import * as yup from 'yup';

const formSchema = yup.object().shape({
  first_name: yup
    .string()
    .trim()
    .required('First name is required ya chump!')
    .min(5, 'Fist name has to be more than one characters!'),
  last_name: yup
    .string()
    .trim()
    .required('Last name is required ya chump!')
    .min(5, 'Last name has to be more than one characters!'),
  email: yup
    .string()
    .email('Gotta be a valid email address!')
    .required('YOU FORGOT TO ENTER AN EMAIL ADDRESS!!'),
  password: yup
    .string()
    .required('ENTER PIN'),
//   disagree: yup.boolean(),
  term: yup.boolean()
})

export default formSchema;