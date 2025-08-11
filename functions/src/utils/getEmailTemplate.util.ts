type EmailType = "contact" | "partnership" | "order";

interface ContactPayload {
  username: string;
  email: string;
  phone: string;
  message: string;
}

interface PartnershipPayload {
  name: string;
  email: string;
  currentPhone: string;
  interestPhone: string;
  currentAddress: string;
  locationOfInterest: string;
  netWorth: string;
  liquidCapital: string;
  hasBusinessExperience: string;
  bio: string;
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
  items: OrderItem[];
  total: string | number;
}

type Payload = ContactPayload | PartnershipPayload | OrderPayload;

export const getEmailTemplate = (type: EmailType, payload: Payload) => {
  let subject = "";
  let html = "";
  let from = "";

  switch (type) {
    case "contact":
      const contact = payload as ContactPayload;
      (from = contact.email),
        (subject = `Contact Request from ${contact.username}`);
      html = `
        <h2>New Contact Message</h2>
        <p><strong>Name:</strong> ${contact.username}</p>
        <p><strong>Email:</strong> ${contact.email}</p>
        <p><strong>Phone:</strong> ${contact.phone}</p>
        <p><strong>Message:</strong><br/> ${contact.message}</p>
      `;
      break;

    case "partnership":
      const partner = payload as PartnershipPayload;
      (from = partner.email), (subject = "New Partnership Request");
      html = `
        <h2>New Partnership Request</h2>
        <p><strong>Name:</strong> ${partner.name}</p>
        <p><strong>Email:</strong> ${partner.email}</p>
        <p><strong>Current Phone:</strong> ${partner.currentPhone}</p>
        <p><strong>Interest Phone:</strong> ${partner.interestPhone}</p>
        <p><strong>Current Address:</strong> ${partner.currentAddress}</p>
        <p><strong>Location of Interest:</strong> ${partner.locationOfInterest}</p>
        <p><strong>Net Worth:</strong> ${partner.netWorth}</p>
        <p><strong>Liquid Capital:</strong> ${partner.liquidCapital}</p>
        <p><strong>Business Experience:</strong> ${partner.hasBusinessExperience}</p>
        <p><strong>Client Bio:</strong> ${partner.bio}</p>

      `;
      break;

    case "order":
      const order = payload as OrderPayload;
      from = order.user.email;
      subject = `New Order from ${order.user.username}`;

      const orderRows = order?.items
        ?.map(
          (item) => `
        <tr>
          <td style="padding: 8px; border: 1px solid #ccc;">${item.name}</td>
          <td style="padding: 8px; border: 1px solid #ccc;">${item.size}</td>
          <td style="padding: 8px; border: 1px solid #ccc; text-align: center;">${
            item.quantity
          }</td>
          <td style="padding: 8px; border: 1px solid #ccc; text-align: right;">$${item.price.toFixed(
            2
          )}</td>
          <td style="padding: 8px; border: 1px solid #ccc; text-align: right;">$${(
            item.price * item.quantity
          ).toFixed(2)}</td>
        </tr>
        ${
          item.comment
            ? `<tr><td colspan="5" style="padding: 6px 12px; font-style: italic; background: #f9f9f9;">Comment: ${item.comment}</td></tr>`
            : ""
        }
      `
        )
        .join("");

      html = `
    <h2>New Order</h2>
    <p><strong>User:</strong> ${order.user.username}</p>
    <p><strong>Email:</strong> ${order.user.email}</p>
    <p><strong>Phone:</strong> ${order.user.phone || "N/A"}</p>
    <hr/>
    <h3>Order Summary</h3>
    <table style="border-collapse: collapse; width: 100%; font-family: sans-serif;">
      <thead>
        <tr style="background-color: #f2f2f2;">
          <th style="padding: 8px; border: 1px solid #ccc;">Item</th>
          <th style="padding: 8px; border: 1px solid #ccc;">Size</th>
          <th style="padding: 8px; border: 1px solid #ccc;">Qty</th>
          <th style="padding: 8px; border: 1px solid #ccc;">Price</th>
          <th style="padding: 8px; border: 1px solid #ccc;">Subtotal</th>
        </tr>
      </thead>
      <tbody>
        ${orderRows}
        <tr>
          <td colspan="4" style="padding: 8px; border: 1px solid #ccc; text-align: right;"><strong>Total</strong></td>
          <td style="padding: 8px; border: 1px solid #ccc; text-align: right;"><strong>$${parseFloat(
            `${order.total}`
          ).toFixed(2)}</strong></td>
        </tr>
      </tbody>
    </table>
  `;
      break;

    default:
      throw new Error("Invalid email type");
  }

  return { subject, html, from };
};
