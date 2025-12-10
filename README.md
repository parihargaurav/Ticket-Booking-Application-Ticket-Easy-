# Ticket Booking Application

This is a ticket booking application built using React, Express, MongoDB and Cloudinary.

## Frontend

The frontend is built using React and is responsible for rendering the user interface. It uses React Router for client-side routing and React Hooks for managing state.

The application is divided into several components:

* Header: displays the navigation bar and logo
* IndexPage: displays the homepage with a list of places
* LoginPage: handles user login
* RegisterPage: handles user registration
* ProfilePage: displays user profile information and bookings
* PlacesPage: displays a list of places
* PlacePage: displays information about a specific place
* BookingPage: handles booking for a specific place
* BookingWidget: handles the booking form and calendar

## Backend

The backend is built using Express and is responsible for handling API requests. It uses MongoDB as the database and Cloudinary for image storage.

The application has the following API endpoints:

* /api/bookings: handles booking creation and retrieval
* /api/users: handles user registration and login
* /api/places: handles place creation and retrieval
* /api/upload: handles image upload to Cloudinary


