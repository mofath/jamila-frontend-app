import { useForm } from "react-hook-form";
import {
  FaInstagram as InstagramIcon,
  FaFacebook as FacebookIcon,
  FaYoutube as YoutubeIcon,
  FaTwitter as TwitterIcon,
} from "react-icons/fa";
import { Button, Input, Textarea } from "../../components";

import "./ContactUsSection.css";

const ContactUsSection: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data: any) => {
    console.log(data);
  };

  return (
    <div className="contact-section container mx-auto">
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
              {...register("firstName", { required: "Required" })}
            />
            <Input
              label="Last Name"
              {...register("lastName", { required: "Required" })}
            />
          </div>
          <div className="contact-form__row">
            <Input
              label="Email"
              type="email"
              {...register("email", { required: "Required" })}
            />
            <Input
              label="Phone"
              {...register("phone", { required: "Required" })}
            />
          </div>
          <div className="contact-form__row">
            <Textarea
              label="Message"
              {...register("phone", { required: "Required" })}
            />
          </div>
          <div className="contact-form__row">
            <Button variant="secondary">Send message</Button>
          </div>
        </form>
      </div>
      {/* Contact Info */}
      <div className="contact-info__wrapper">
        <div className="contact-section__heading">
          <p className="heading-3">Need more information</p>
          <p className="text">
            Lorem ipsum dolor sit amet consectetur. In tincidunt suspendisse
            accumsan vivamus sit tellus. Adipiscing morbi viverra amet justo
            dolor.
          </p>
        </div>
        <div className="contact-info__details">
          <div className="contact-info__item">
            <img src="/assets/icons/phone.svg" alt="phone" />
            <span className="heading-5">+20 1147963258</span>
          </div>
          <div className="contact-info__item">
            <img src="/assets/icons/message.svg" alt="" />
            <span className="heading-5">jamila@Jamila.com</span>
          </div>
          <div className="contact-info__item">
            <img src="/assets/icons/location.svg" alt="" />
            <span className="heading-5">New Cairo 467 st</span>
          </div>
          <div className="contact-info__item">
            <img src="/assets/icons/planet.svg" alt="" />
            <span className="heading-5">jamila.com</span>
          </div>
        </div>
        <div className="contact-info__social-media">
          <p className="heading-4">Follow our social media</p>
          <ul className="contact-info__social-media-links">
            <li>
              <InstagramIcon size={32} color="#fff" />
            </li>
            <li>
              <FacebookIcon size={32} color="#fff" />
            </li>
            <li>
              <YoutubeIcon size={32} color="#fff" />
            </li>
            <li>
              <TwitterIcon size={32} color="#fff" />
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ContactUsSection;
