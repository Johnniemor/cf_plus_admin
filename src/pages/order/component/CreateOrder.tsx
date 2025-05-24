import Table from '@/components/Table';
import { iconBackVert, iconFolderAdd } from '@/configs/icon';
import { useForm } from 'react-hook-form';
import { orderHeaders } from '../column/OrderHeader';
import Input from '@/components/Forms/Input';
import DatePicker from '@/components/Forms/DatePicker';
import Button from '@/components/Button';
import SearchDropdown from '@/components/Forms/SearchDropDown';
import Select from '@/components/Forms/Select';

const CreateOrder: React.FC = () => {
  const options = ['Apple', 'Banana', 'Cherry', 'Date', 'Grapes', 'Mango', 'Orange'];
  const expressoptions = ['ມີໄຊ', 'ອານຸສິດ', 'ZTO', 'ຮຸ່ງອາລຸນ'];
  const bank = ['BCEL ONE', 'LDB', 'JDB', 'ສົ່ງເສີມກະສິກຳ'];
  const {
    control,
    register,
    formState: { errors },
  } = useForm();
  return (
    <div>
      <header className="rounded-2xl bg-white pb-4 dark:bg-boxdark">
        <div className="border-b-2 border-gray-300 px-6 py-8">
          <h1 className="text-2xl font-bold text-basetextcolorapp">ສ້າງຄຳສັ່ງຊື່</h1>
        </div>
        <div className="px-6 py-4">
          {/* <SearchDropdown
            className="rounded-lg p-4"
            onSelect={() => {}}
            options={options}
            placeholder="ເລືອກສິນຄ້າ ຫຼື ພີມລະຫັດ"
          /> */}
        </div>
      </header>
      <br />
      <div className="rounded-2xl bg-white dark:bg-boxdark">
        <div className="border-b-2 border-gray-300 px-6 py-8">
          <h1 className="text-2xl text-basetextcolorapp">ລາຍການສິນຄ້າ CF</h1>
        </div>
        <Table header={orderHeaders} data={[]} body={undefined} loading={false} children={undefined}></Table>

        <div className="py-10">
          <div className="grid grid-cols-1 gap-4 px-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            <Select
              name="bank"
              label="ທະນາຄານ"
              placeholder="ທະນາຄານ"
              rules={{ required: 'ກະລຸນາປ້ອນຊື່ປະເພດສິນຄ້າ' }}
              options={bank}
              className="rounded-lg py-4"
              classLabel="mb-2.5"
              control={control}
            />
            <Input
              name="reference_number"
              label="ເລກອ້າງອີງ"
              placeholder="ເລກອ້າງອີງ"
              className="rounded-lg"
              register={register}
              errors={errors}
              rules={{ required: 'ກະລຸນາປ້ອນຊື່ປະເພດສິນຄ້າ' }}
            />
            <Input
              name="transfer_amount"
              label="ຈຳນວນໂອນ"
              className="rounded-lg"
              placeholder="ຈຳນວນໂອນ"
              register={register}
              errors={errors}
              rules={{ required: 'ກະລຸນາປ້ອນຊື່ປະເພດສິນຄ້າ' }}
            />
            <DatePicker
              className="rounded-lg"
              label="ເວລາໂອນ"
              name={'transfer_time'}
              control={control}
              placeholder="../../.... _:_:_ "
            />
          </div>

          <div className="grid gap-4 px-4 py-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            <Input
              name="name_customer"
              label="ຊື່ລູກຄ້າ"
              placeholder="ຊື່ລູກຄ້າ"
              className="rounded-lg"
              register={register}
              errors={errors}
              rules={{ required: 'ກະລຸນາປ້ອນຊື່ປະເພດສິນຄ້າ' }}
            />
            <Input
              name="phone_number"
              label="ເບີໂທລູກຄ້າ"
              placeholder="ເບີໂທລູກຄ້າ"
              className="rounded-lg"
              register={register}
              errors={errors}
              rules={{ required: 'ກະລຸນາປ້ອນຊື່ປະເພດສິນຄ້າ' }}
            />
            <Input
              name="link_contract_customer"
              label="ລີ້ງຕິດຕໍ່ໂທລູກຄ້າ"
              placeholder="ລີ້ງຕິດຕໍ່ລູກຄ້າ (ຖ້າມີ)"
              className="rounded-lg"
              register={register}
              errors={errors}
              rules={{ required: 'ກະລຸນາປ້ອນຊື່ປະເພດສິນຄ້າ' }}
            />
          </div>
          <div className="grid gap-4 border-b-2 border-gray-300 px-4 py-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2">
            <Select
              name="express"
              label="ບໍລິສັດຂົ່ນສົ່ງ"
              placeholder="ບໍລິສັດຂົ່ນສົ່ງ"
              rules={{ required: 'ກະລຸນາປ້ອນຊື່ປະເພດສິນຄ້າ' }}
              options={expressoptions}
              className="rounded-lg py-4"
              classLabel="mb-2.5 "
              control={control}
            />
            <Input
              name="logistic"
              label="ຈັດສົ່ງໄປທີ່"
              placeholder="ຈັດສົ່ງໄປທີ່"
              className="rounded-lg"
              register={register}
              errors={errors}
              rules={{ required: 'ກະລຸນາປ້ອນຊື່ປະເພດສິນຄ້າ' }}
            />
            <Input
              name="confirm_transaction"
              label="ຮູບຖ່າຍໂອນ"
              placeholder="ຮູບຖ່າຍໂອນ"
              className="rounded-lg"
              register={register}
              errors={errors}
              rules={{ required: 'ກະລຸນາປ້ອນຊື່ປະເພດສິນຄ້າ' }}
            />
          </div>
          <div className="flex justify-end pt-6">
            <div className="px-10">
              <div className="items-start">
                <h1>
                  ຈຳນວນສິ້ນຄ້າທັງໝົດ: <span className="font-bold">5 ອັນ</span>{' '}
                </h1>
                <h1>
                  ລາຄາທັງໝົດ: <span className="font-bold">500,000 ກີບ</span>
                </h1>
                <div className="mt-2 flex gap-4 pt-4">
                  <Button
                    className="rounded-xl bg-red-500 py-4 dark:bg-red-500"
                    children={'ຍົກເລີກ'}
                    icon={iconBackVert}
                  />
                  <Button className="rounded-xl bg-maingreen py-4" children={'ສ້າງອໍເດີ CF'} icon={iconFolderAdd} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateOrder;
