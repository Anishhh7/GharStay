
const reservationCustomerEmail = (reservation) => {
   return{ email: reservation.customerEmail,
    subject: 'Reservation Received',
    message: `Dear ${reservation.customerName},

Thank you for choosing GharStay Resort.

We have successfully received your reservation request.

Our team will review your request and contact you shortly to confirm your booking.

Reservation Details
-------------------
Name: ${reservation.customerName}
Email: ${reservation.customerEmail}
Guest: ${reservation.customerNumber}
Check-in: ${reservation.checkedIn.toLocaleDateString('en-GB', {
  day: 'numeric',
  month: 'long',
  year: 'numeric'
})}
Check-out: ${reservation.checkedOut.toLocaleDateString('en-GB', {
  day: 'numeric',
  month: 'long',
  year: 'numeric'
})}

We look forward to welcoming you!

Regards,
GharStay Resort `
 }};
  
export default reservationCustomerEmail;
 