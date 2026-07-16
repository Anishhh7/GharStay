const reservationAdminEmail = (reservation) => {
  return {
    email: process.env.EMAIL_USERNAME,
    subject: 'New Reservation Alert',
    message: `New Reservation Request

Customer Details
----------------
Name: ${reservation.customerName}
email: ${reservation.customerEmail}
Phone: ${reservation.customerNumber}

Reservation Details
-------------------
Guests: ${reservation.numberOfGuests}
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
Status: ${reservation.status}


Reservation submitted on:
${reservation.createdAt}`
  };
};

export default reservationAdminEmail;