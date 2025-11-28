const Booking = require("../models/Booking");

exports.createBooking = async (req, res) => {
  const booking = await Booking.create({
    user: req.user.id,
    ...req.body,
  });

  res.json(booking);
};

exports.getBookings = async (req, res) => {
  const bookings = await Booking.find({ user: req.user.id }).populate("place");
  res.json(bookings);
};
