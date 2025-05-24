import Button from '@/components/Button';
import Input from '@/components/Forms/Input';
import Select from '@/components/Forms/Select';
import { iconLocation, iconMail } from '@/configs/icon';
import { useForm } from 'react-hook-form';

const ConfirmLocation: React.FC = () => {
  const expressoptions = ['ມີໄຊ', 'ອານຸສິດ', 'ZTO', 'ຮຸ່ງອາລຸນ'];
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data: any) => {
    console.log('Form Data:', data);
  };

  return (
    <div className="md:px-[88px]">
      <div className="rounded-xl bg-white px-4 pb-6 pt-2">
        <div className="">
          <div className="flex py-4">
            <div>{iconLocation}</div>
            <h1 className="text-xl font-bold text-periwinkleblue">ທີ່ຢູ່ການຈັດສົ່ງ</h1>
          </div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex items-center gap-4 py-2">
              <h1 className="w-[80px] py-2 text-black">ຊື່ລູກຄ້າ :</h1>
              <Input
                type="text"
                placeholder="ຊື່ລູກຄ້າ"
                name={'username'}
                className="rounded-xl bg-customgray"
                register={register}
                errors={errors}
                rules={{ required: 'ກະລຸນາປ້ອນຊື່ລູກຄ້າ' }}
              ></Input>
            </div>
            <div className="flex items-center gap-4 py-2">
              <h1 className="w-[80px] py-2 text-black">ທີ່ຢູ່ :</h1>
              <Input
                label="Email"
                name="email"
                placeholder="Enter your email..."
                register={register}
                className="rounded-xl"
                rules={{
                  required: 'Email is required',
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: 'Please enter a valid email address',
                  },
                }}
                errors={errors}
              >
                {iconMail}
              </Input>
              <Input
                type="text"
                placeholder="ທີ່ຢູ່"
                name={'adress'}
                className="rounded-xl bg-customgray"
                register={register}
                errors={errors}
                rules={{ required: 'ກະລຸນາປ້ອນທີ່ຢູ່' }}
              ></Input>
            </div>
            <div className="flex items-center gap-4 py-2">
              <h1 className="w-[80px] py-2 text-black">ເບີໂທ :</h1>
              <Input
                type="text"
                placeholder="ເບີໂທ"
                name={'phone_number'}
                className="rounded-xl bg-customgray"
                register={register}
                errors={errors}
                rules={{ required: 'ກະລຸນາປ້ອນເບີໂທ' }}
              ></Input>
            </div>
            <div className="flex items-center gap-4">
              <h1 className="text-black">ເລືອກຂົນສົ່ງ</h1>
              <div className="w-[500px]">
                <Select
                  name="express"
                  placeholder="ບໍລິສັດຂົ່ນສົ່ງ"
                  rules={{ required: 'ກະລຸນາປ້ອນຊື່ປະເພດສິນຄ້າ' }}
                  options={expressoptions}
                  className="rounded-lg"
                  classLabel="mb-2.5 "
                  control={control}
                  label={''}
                />
              </div>
            </div>
          </form>

          <div className="flex justify-end py-10">
            <Button type="submit" children={'ຢືນຢັນທີ່ຢູ່'} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmLocation;
