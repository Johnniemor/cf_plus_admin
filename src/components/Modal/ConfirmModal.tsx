import { useTranslation } from 'react-i18next';
import Button from '../Button';

interface IModalConfirmModal {
  show: boolean;
  setShow: any;
  title?: string;
  message: string;
  handleConfirm: any;
  textCancel?: string;
  textConfirm?: string;
  isLoading?: boolean;
  disabled?: boolean;
}

export default function ConfirmModal({
  show,
  setShow,
  title,
  message,
  handleConfirm,
  textCancel,
  textConfirm,
  isLoading = false,
  disabled = false,
}: IModalConfirmModal) {
  const { t } = useTranslation();
  return (
    <>
      {show ? (
        <>
          <div className="fixed inset-0 z-9999 flex items-center justify-center overflow-y-auto overflow-x-hidden bg-[rgba(34,37,64,0.8)] outline-none focus:outline-none">
            <div className="relative mx-auto my-6 w-[400px]">
              <div className="relative z-10 flex w-full flex-col rounded-xl border border-stroke bg-white pb-2.5 shadow-default outline-none focus:outline-none dark:border-strokedark dark:bg-boxdark">
                <div className="p-4 md:p-5">
                  <svg
                    className="mb-4 h-10 w-10 text-red-600 dark:text-gray-200"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 20 20"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                    />
                  </svg>
                  <h3 className="pb-4 text-lg font-medium text-gray-900 dark:text-white">
                    {title ?? t('title_delete_modal')}
                  </h3>
                  <h3 className="mb-5 text-base font-normal text-gray-500 dark:text-gray-400">{message}</h3>
                  <div className="flex w-full justify-between gap-4">
                    <Button
                      type="button"
                      onClick={() => setShow(false)}
                      className="border-1 w-full text-black"
                      disabled={isLoading}
                    >
                      {textCancel}
                    </Button>

                    <Button
                      onClick={handleConfirm}
                      type="button"
                      className="w-full rounded bg-red-600"
                      disabled={disabled || isLoading}
                    >
                      {isLoading ? (
                        <div className="flex items-center justify-center">
                          <svg
                            className="mr-2 h-5 w-5 animate-spin text-white"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                          >
                            <circle
                              className="opacity-25"
                              cx="12"
                              cy="12"
                              r="10"
                              stroke="currentColor"
                              strokeWidth="4"
                            ></circle>
                            <path
                              className="opacity-75"
                              fill="currentColor"
                              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                            ></path>
                          </svg>
                          {textConfirm}
                        </div>
                      ) : (
                        textConfirm
                      )}
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="fixed inset-0 z-40 bg-black opacity-25"></div>
        </>
      ) : null}
    </>
  );
}
