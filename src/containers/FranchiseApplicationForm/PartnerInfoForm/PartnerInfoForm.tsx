import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { yupResolver } from "@hookform/resolvers/yup";
import Input from "../../../components/Input/Input";
import Select from "../../../components/Select/Select";
import { countries } from "../../../data/countries-data";
import { PartnerInfoSchema } from "../../../utils/generateValidationSchema";
import Spinner from "../../../components/Spinner/Spinner";
import CheckboxGroup from "../../../components/CheckboxGroup/CheckboxGroup";
import Button from "../../../components/Button/Button";
import { useSendEmailMutation } from "../../../apis/mailerApi";
import "./PartnerInfoForm.css";

interface PartnerInfoFormProps {
  liquidCapitals: { label: string; value: string }[];
  netWorth: { label: string; value: string }[];
}

const PartnerInfoForm: React.FC<PartnerInfoFormProps> = ({
  liquidCapitals,
  netWorth,
}) => {
  const [loading, setLoading] = useState(false);

  const [sendEmail] = useSendEmailMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm({
    resolver: yupResolver(PartnerInfoSchema),
  });

  const onSubmit = async (data: any) => {
    setLoading(true);
    const templateParams = {
      type: "partnership",
      payload: {
        name: `${data.personal.firstName} ${data.personal.lastName}`,
        email: data.personal.email,
        currentPhone: data.currentAddress.phone,
        interestPhone: data.locationOfInterest.phone,
        currentAddress: `${data.currentAddress.city}, ${data.currentAddress.country}`,
        locationOfInterest: `${data.locationOfInterest.city}, ${data.locationOfInterest.country}`,
        netWorth: data.netWorth,
        liquidCapital: data.liquidCapital,
        hasBusinessExperience: data?.hasBusinessExperience ? "Yes" : "No",
      },
    };

    try {
      await sendEmail(templateParams);
      toast.success("Partner request sent successfully");
      reset();
    } catch (err: any) {
      console.error("Email sending failed:", err);
      toast.error("Failed to send request. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="partner-info-form-container">
      {loading && <Spinner />}
      <form className="partner-info-form" onSubmit={handleSubmit(onSubmit)}>
        {/* Personal Information */}
        <div className="partner-info-form__row">
          <Input
            label="First Legal Name"
            placeholder="Enter your first name"
            {...register("personal.firstName")}
            error={errors.personal?.firstName}
          />
          <Input
            label="Last Legal Name"
            placeholder="Enter your last name"
            {...register("personal.lastName")}
            error={errors.personal?.lastName}
          />
        </div>

        {/* Email */}
        <div className="partner-info-form__row">
          <Input
            label="Email"
            type="email"
            placeholder="Enter your email"
            {...register("personal.email")}
            error={errors.personal?.email}
          />
        </div>

        {/* Current Address */}
        <div className="form-group">
          <label className="form-group__label">Current Address</label>
          <div className="partner-info-form__row address">
            <Select
              placeholder="Select Country"
              options={countries}
              {...register("currentAddress.country")}
              error={errors.currentAddress?.country}
            />
            <Input
              placeholder="Enter city"
              {...register("currentAddress.city")}
              error={errors.currentAddress?.city}
            />
            <Input
              placeholder="Enter phone number"
              {...register("currentAddress.phone")}
              error={errors.currentAddress?.phone}
            />
          </div>
        </div>

        {/* Location of Interest */}
        <div className="form-group">
          <label className="form-group__label">Location of Interest</label>
          <div className="partner-info-form__row address">
            <Select
              placeholder="Select Country"
              options={countries}
              {...register("locationOfInterest.country", {
                required: "Required",
              })}
              error={errors.locationOfInterest?.country}
            />
            <Input
              placeholder="Enter city"
              {...register("locationOfInterest.city")}
              error={errors.locationOfInterest?.city}
            />
            <Input
              placeholder="Enter phone number"
              {...register("locationOfInterest.phone", {
                required: "Required",
              })}
              error={errors.locationOfInterest?.phone}
            />
          </div>
        </div>

        {/* Financial Details */}
        <div className="partner-info-form__row">
          <Select
            label="Net Worth"
            placeholder="Select Net Worth"
            options={netWorth}
            {...register("netWorth")}
            error={errors.netWorth}
          />
          <Select
            label="Liquid Capital"
            placeholder="Select Liquid Capital"
            options={liquidCapitals}
            {...register("liquidCapital")}
            error={errors.liquidCapital}
          />
        </div>

        {/* Business Experience */}
        <CheckboxGroup
          label="Have you been in business before?"
          options={[{ label: "Yes", value: "yes" }]}
          {...register("hasBusinessExperience")}
          error={errors.hasBusinessExperience}
        />

        <div>
          <Button type="submit" variant="secondary">
            Join Now
          </Button>
        </div>
      </form>
    </div>
  );
};

export default PartnerInfoForm;
