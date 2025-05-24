import { iconCancel } from '@/configs/icon';
import Input from '../Forms/Input';
import { useForm } from 'react-hook-form';

interface IModalConfirmModal {
  show: boolean;
  setShow: any;
  title?: string;
  handleConfirm: any;
  inputLabel?: string;
  textButton: string;
}

export default function ModalForm({ show, setShow, title, handleConfirm, inputLabel, textButton }: IModalConfirmModal) {
  const {
    register,
    formState: { errors },
  } = useForm();

  return (
    <>
      {show ? (
        <>
          <div className="fixed inset-0 z-9999 flex items-center justify-center overflow-y-auto overflow-x-hidden bg-[rgba(34,37,64,0.8)] outline-none focus:outline-none">
            <div className="relative mx-auto my-6 w-[700px] px-4">
              <div className="relative z-10 flex w-full flex-col rounded-sm border border-stroke bg-white px-5 pb-2.5 pt-6 shadow-default outline-none focus:outline-none dark:border-strokedark dark:bg-boxdark">
                <div className="text-center">
                  <div className="flex justify-between pb-6">
                    <h1 className="font-bold text-gray-600">{title}</h1>
                    <button onClick={() => setShow(false)}>{iconCancel}</button>
                  </div>
                  <Input
                    label={inputLabel}
                    className="text-start text-sm text-gray-600"
                    name={'name'}
                    register={register}
                    errors={errors}
                  ></Input>

                  <div className="flex justify-end py-6">
                    <button
                      onClick={handleConfirm}
                      type="button"
                      className="inline-flex items-center rounded-lg bg-green-500 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-gray-600 focus:outline-none focus:ring-4 focus:ring-red-300 dark:focus:ring-red-800"
                    >
                      {textButton}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="pointer-events-none fixed inset-0 z-40 bg-black opacity-25"></div>
        </>
      ) : null}
    </>
  );
}
