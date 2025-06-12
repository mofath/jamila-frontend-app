import { useForm } from "react-hook-form";
import { Input } from "../../../components";
import "./PartnerInfoForm.css"

export default function PartnerInfoForm() {
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
        <Input label="First Name" {...register("firstName", { required: "Required" })} />
        <Input label="Last Name" {...register("lastName", { required: "Required" })} />
      </div>
      <div className="partner-info-form__row">
        <Input label="Email" type="email" {...register("email", { required: "Required" })} />
        <Input label="Phone" {...register("phone", { required: "Required" })} />
      </div>

      <div className="partner-info-form__row">
        <Input label="Country" {...register("country", { required: "Required" })} />
        <Input label="City" {...register("city", { required: "Required" })} />
      </div>

      <div className="partner-info-form__row">
        <Input label="Net Worth" {...register("netWorth", { required: "Required" })} />
        <Input label="Interest" {...register("interest", { required: "Required" })} />
      </div>
    </form>
  );
}
