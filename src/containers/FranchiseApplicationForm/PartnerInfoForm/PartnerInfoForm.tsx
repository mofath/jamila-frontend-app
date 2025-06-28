import { useForm } from "react-hook-form";
import Input from "../../../components/Input/Input";
import Select from "../../../components/Select/Select";
import "./PartnerInfoForm.css";

interface PartnerInfoFormProps {
  liquidCapitals: any[];
  netWorth: any[];
}
const PartnerInfoForm: React.FC<PartnerInfoFormProps> = ({
  liquidCapitals,
  netWorth,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data: any) => {
    console.log(data);
  };

  return (
    <form className="partner-info-form" onSubmit={handleSubmit(onSubmit)}>
      <div className="partner-info-form__row">
        <Input
          label="First Legal Name"
          {...register("firstName", { required: "Required" })}
        />
        <Input
          label="Last Legal Name"
          {...register("lastName", { required: "Required" })}
        />
      </div>
      <div className="partner-info-form__row">
        <Input
          label="Email"
          type="email"
          {...register("email", { required: "Required" })}
        />
      </div>
      {/* City where you live */}
      <div className="form-group">
        <label className="form-group__label"> City where you live</label>
        <div className="partner-info-form__row address">
          <Input
            placeholder="Country"
            {...register("country", { required: "Required" })}
          />
          <Input
            placeholder="City"
            {...register("city", { required: "Required" })}
          />
          <Input
            placeholder="Phone"
            {...register("phone", { required: "Required" })}
          />
        </div>
      </div>

      {/* City where you interest in to open */}
      <div className="form-group">
        <label className="form-group__label">
          {" "}
          City where you interest in to open
        </label>
        <div className="partner-info-form__row address">
          <Input
            placeholder="Country"
            {...register("country", { required: "Required" })}
          />
          <Input
            placeholder="City"
            {...register("city", { required: "Required" })}
          />
          <Input
            placeholder="Phone"
            {...register("phone", { required: "Required" })}
          />
        </div>
      </div>
      <div className="partner-info-form__row">
        <Select
          options={netWorth}
          label="Net Worth Liquid"
          {...register("netWorth", { required: "Required" })}
        />
        <Select
          label="Capital Liquids"
          options={liquidCapitals}
          {...register("interest", { required: "Required" })}
        />
      </div>
      {/* Todo: Add checkbox */}
      <div className="flex flex-row gap-2">
        <input type="checkbox" />
        <label htmlFor="">Have you been in buissness before</label>
      </div>
    </form>
  );
};

export default PartnerInfoForm;
