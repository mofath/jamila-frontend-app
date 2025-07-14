import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import toast from "react-hot-toast";
import {
  FaInstagram as InstagramIcon,
  FaFacebook as FacebookIcon,
  FaGoogle as GoogleIcon,
} from "react-icons/fa";
import Button from "../../components/Button/Button";
import Textarea from "../../components/Textarea/Textarea";
import Input from "../../components/Input/Input";
import { contactInfo } from "../../data/contact-info";
import Spinner from "../../components/Spinner/Spinner";
import { ROUTES } from "../../constants/routes.constants";
import { useSendEmailMutation } from "../../apis/mailerApi";
import { contactUsSchema } from "../../utils/generateValidationSchema";
import "./ContactUsForm.css";

const ContactUsForm: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const [sendEmail] = useSendEmailMutation();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(contactUsSchema),
  });

  const onSubmit = async (data: any) => {
    setLoading(true);
    const templateParams = {
      type: "contact" as any,
      from: data.email,
      username: data.firstName + " " + data.lastName,
      phone: data.phone,
      message: data.message,
    };

    try {
      await sendEmail(templateParams);
      toast.success("Message sent successfully");
      reset();
      // Wait 2 seconds, then redirect to the menu
      setTimeout(() => {
        // navigate(ROUTES.MENU);
      }, 200);
    } catch (err: any) {
      console.error("FAILED", err);
      toast.error("Failed to send message. Please try again");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="contact-section container mx-auto">
      {loading && <Spinner />}
      {/* Contact Form */}
      <div className="contact-form__wrapper">
        <div className="contact-section__heading">
          <p className="subtitle">Contact</p>
          <h2 className="heading-2">Get In Touch</h2>
        </div>
        <form className="contact-form" onSubmit={handleSubmit(onSubmit)}>
          <div className="contact-form__row">
            <Input
              label="First Name"
              placeholder="Enter your first name"
              {...register("firstName")}
              error={errors.firstName}
            />
            <Input
              label="Last Name"
              placeholder="Enter your last name"
              {...register("lastName")}
              error={errors.lastName}
            />
          </div>
          <div className="contact-form__row">
            <Input
              label="Email"
              type="email"
              placeholder="Enter your email address"
              {...register("email")}
              error={errors.email}
            />
            <Input
              label="Phone"
              placeholder="Enter your phone number"
              {...register("phone")}
              error={errors.phone}
            />
          </div>
          <div className="contact-form__row">
            <Textarea
              label="Message"
              placeholder="Write your message here..."
              {...register("message")}
              error={errors.message}
            />
          </div>
          <div className="contact-form__row">
            <Button variant="secondary" type="submit" disabled={loading}>
              Send message
            </Button>
          </div>
        </form>
      </div>

      {/* Contact Info */}
      <div className="contact-info__wrapper">
        <div className="contact-section__heading">
          <p className="heading-3">Need more information</p>
          <p className="text">
            Please reach out to our support team for assistance. We are happy to
            help with any questions or concerns.
          </p>
        </div>
        <div className="contact-info__details">
          <div className="contact-info__item">
            <img src="/assets/icons/phone.svg" alt="phone" />
            <span className="heading-5">{contactInfo.phone}</span>
          </div>
          <div className="contact-info__item">
            <img src="/assets/icons/message.svg" alt="email" />
            <span className="heading-5">{contactInfo.email}</span>
          </div>
          <div className="contact-info__item">
            <img src="/assets/icons/location.svg" alt="location" />
            <span className="heading-5">{contactInfo.address}</span>
          </div>
        </div>
        <div className="contact-info__social-media">
          <p className="heading-4">Follow our social media</p>
          <ul className="contact-info__social-media-links">
            <Link to={contactInfo.instagram}>
              <InstagramIcon size={32} color="#fff" />
            </Link>
            <Link to={contactInfo.facebook}>
              <FacebookIcon size={32} color="#fff" />
            </Link>
            <Link to={contactInfo.google}>
              <GoogleIcon size={32} color="#fff" />
            </Link>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ContactUsForm;
