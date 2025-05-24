import Button from '@/components/Button';
import Divider from '@/components/Divider/Divider';
import Input from '@/components/Forms/Input';
import { iconArrowBack } from '@/configs/icon';
import useChangePasswordHook from '@/hooks/auth/ChangePassword.hook';
import { IChangePassword } from '@/types/user';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

const ChangePassword = () => {
  const { changePassword } = useChangePasswordHook();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    reset,
  } = useForm<IChangePassword>();
  const onSubmit = async (data: IChangePassword) => {
    try {
      await changePassword(data);
      reset();
      navigate('/');
    } catch (error) {
      reset();
      throw error;
    }
  };
  return (
    <div className="overflow-hidden rounded-lg bg-white dark:bg-boxdark md:m-4">
      <div>
        <div className="px-10 py-6">
          <div className='mb-6'>
            <Button
              variant="info"
              onClick={() => navigate(-1)}
              className="text-black"
              icon={iconArrowBack}
              shape="rounded"
              children={'ກັບຄືນ'}
            />
          </div>
          <h1 className="text-2xl font-bold text-black dark:text-white">Change password</h1>
        </div>

        <Divider />
        <div className="p-6">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="py-4">
              <Input
                height={60}
                label="Enter your current_password"
                register={register}
                errors={errors}
                type="password"
                name={'current_password'}
                className="rounded-md"
                placeholder="Enter your current password ..."
                rules={{
                  required: 'Password is required',
                  minLength: {
                    value: 8,
                    message: 'Password must be at least 8 characters long',
                  },
                  pattern: {
                    value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                    message:
                      'Password must contain at least one uppercase letter, one lowercase letter, one digit, and one special character',
                  },
                  validate: (value) => value.length >= 8 || 'Password must be at least 8 characters',
                }}
              />
            </div>
            <div className="py-4">
              <Input
                height={60}
                label="Enter new password"
                type="password"
                name="password"
                className="rounded-md"
                placeholder="Enter new password..."
                register={register}
                rules={{
                  required: 'Password is required',
                  minLength: {
                    value: 8,
                    message: 'Password must be at least 8 characters long',
                  },
                  pattern: {
                    value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                    message:
                      'Password must contain at least one uppercase letter, one lowercase letter, one digit, and one special character',
                  },
                  validate: (value) => value.length >= 8 || 'Password must be at least 8 characters',
                }}
                errors={errors}
              ></Input>
            </div>

            <div className="py-4">
              <Input
                height={60}
                label="Enter confirm password"
                type="password"
                name="confirm_password"
                className="rounded-md"
                placeholder="Confirm new password..."
                register={register}
                rules={{
                  required: 'Confirm Password is required',
                  minLength: {
                    value: 8,
                    message: 'Password must be at least 8 characters long',
                  },
                  validate: (value) => value === watch('password') || 'Passwords do not match',
                }}
                errors={errors}
              ></Input>
            </div>
            <div className="flex justify-end py-8">
              <Button shape="pill" className="py-4" type="submit">
                Confirm change password
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ChangePassword;
