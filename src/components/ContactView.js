import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import "./ContactView.css";

function ContactView() {
  const baseUrl = "http://localhost:3000/contacts";

  const { contactID } = useParams();
  const [contact, setContact] = useState('');

  useEffect(() => {
    fetch(`${baseUrl}/${contactID}`)
      .then((res) => res.json())
      .then((data) => {
        setContact(data);
      });
  }, [contactID]);

  return (
    
      <div className="contact-details-container">

        <Link to="/" className="btn btn-info">home</Link>
        <div className="contactDetails">
      <h2>Contact Details</h2>
      <p>ID: {contact.id}</p>
      <p>Name: {contact.name}</p>
      <p>Email: {contact.email}</p>
      <p>Phone: {contact.phone}</p>
      {/* Add any other contact details you want to display */}
      </div>
      <Link className="btn btn-danger" to="/ContactList">Back to listing</Link>

    </div>
  );
}

export default ContactView;
