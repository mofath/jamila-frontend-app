type EmailType = "contact" | "partnership" | "order";

interface ContactPayload {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  message: string;
}

interface PartnershipPayload {
  title: string;
  name: string;
  email: string;
  currentPhone: string;
  interestPhone: string;
  currentAddress: string;
  locationOfInterest: string;
  netWorth: string;
  liquidCapital: string;
  hasBusinessExperience: string;
  time: string;
}

interface OrderItem {
  name: string;
  size: string;
  quantity: number;
  price: number;
  comment?: string;
}

interface User {
  username: string;
  email: string;
  phone?: string;
}

interface OrderPayload {
  user: User;
  cart: OrderItem[];
}

type Payload = ContactPayload | PartnershipPayload | OrderPayload;

export const getEmailTemplate = (type: EmailType, payload: Payload) => {
  let subject = "";
  let html = "";

  switch (type) {
    case "contact":
      const contact = payload as ContactPayload;
      subject = `Contact Request from ${contact.firstName} ${contact.lastName}`;
      html = `
        <h2>New Contact Message</h2>
        <p><strong>Name:</strong> ${contact.firstName} ${contact.lastName}</p>
        <p><strong>Email:</strong> ${contact.email}</p>
        <p><strong>Phone:</strong> ${contact.phone}</p>
        <p><strong>Message:</strong><br/> ${contact.message}</p>
      `;
      break;

    case "partnership":
      const partner = payload as PartnershipPayload;
      subject = "New Partnership Request";
      html = `
        <h2>${partner.title}</h2>
        <p><strong>Name:</strong> ${partner.name}</p>
        <p><strong>Email:</strong> ${partner.email}</p>
        <p><strong>Current Phone:</strong> ${partner.currentPhone}</p>
        <p><strong>Interest Phone:</strong> ${partner.interestPhone}</p>
        <p><strong>Current Address:</strong> ${partner.currentAddress}</p>
        <p><strong>Location of Interest:</strong> ${partner.locationOfInterest}</p>
        <p><strong>Net Worth:</strong> ${partner.netWorth}</p>
        <p><strong>Liquid Capital:</strong> ${partner.liquidCapital}</p>
        <p><strong>Business Experience:</strong> ${partner.hasBusinessExperience}</p>
        <p><strong>Submitted:</strong> ${partner.time}</p>
      `;
      break;

    case "order":
      const order = payload as OrderPayload;
      subject = `New Order from ${order.user.username}`;
      html = `
        <h2>New Order</h2>
        <p><strong>User:</strong> ${order.user.username}</p>
        <p><strong>Email:</strong> ${order.user.email}</p>
        <p><strong>Phone:</strong> ${order.user.phone || "N/A"}</p>
        <hr/>
        <h3>Order Items</h3>
        ${order.cart
          .map(
            (item) => `
            <div>
              <p><strong>${item.name}</strong> (${item.size}) x ${
              item.quantity
            } - $${item.price}</p>
              ${item.comment ? `<p>Comment: ${item.comment}</p>` : ""}
            </div>
          `
          )
          .join("")}
      `;
      break;
      
    default:
      throw new Error("Invalid email type");
  }

  return { subject, html };
};
