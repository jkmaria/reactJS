import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import Button from "./Button";



function ContactEdit() {
  const baseUrl = 'http://localhost:3000/contacts';
  const { id } = useParams(); // Get the contact ID from the URL params
  const isEditing = id !== undefined; // Check if it's an edit operation
  const navigate = useNavigate();

  // State variables for contact data
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [errors, setErrors] = useState({});

  // Function to validate the form
  const validateForm = () => {
    const newErrors = {};
    if (!name) {
      newErrors.name = 'Name is required';
    }
    if (!email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Invalid email format';
    }
    if (!phone) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^\d{11}$/.test(phone)) {
      newErrors.phone = 'Invalid phone number format (11 digits)';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // Return true if there are no errors
  };

  // Function to fetch contact data for editing
  useEffect(() => {
    if (isEditing) {
      // Fetch contact data based on the ID and populate the form
      fetch(`${baseUrl}/${id}`)
        .then((res) => res.json())
        .then((data) => {
          setName(data.name);
          setEmail(data.email);
          setPhone(data.phone);
        })
        .catch((error) => {
          console.error("Error fetching contact data:", error);
        });
    }
  }, [id, isEditing]);

  // Function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    const isValid = validateForm();

    if (isValid) {
      const contactData = {
        name,
        email,
        phone,
      };

      // Determine whether it's an edit or create operation
      const requestMethod = isEditing ? "PUT" : "POST";
      const requestUrl = isEditing ? `${baseUrl}/${id}` : baseUrl;

      // Send the request to create/update the contact
      fetch(requestUrl, {
        method: requestMethod,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(contactData),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(isEditing ? "Contact updated successfully!" : "Contact added successfully!", data);

          // After a successful operation, navigate to the contact list
          navigate('/ContactList');
        })
        .catch((error) => {
          console.error(isEditing ? "Error updating contact:" : "Error adding contact:", error);
        });
    }
  };

  return (
    <div>
      <div className="contact-form">
      <h2>{isEditing ? "Edit Contact" : "Add Contact"}</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
          {errors.name && <div className="error">{errors.name}</div>}
        </div>
        <div>
          <label>Email:</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
          {errors.email && <div className="error">{errors.email}</div>}
        </div>
        <div> 
          <label>Phone Number:</label>
          <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} />
          {errors.phone && <div className="error">{errors.phone}</div>}
        </div>
        <Button  bgColor="#347672" borderRadius="15px" marginTop="20px" onClick={handleSubmit}>{"Update Contact"}</Button>
        <br></br>
        <span><Link to="/ContactList">Cancel</Link></span>
      </form>
      </div>
    </div>
  );
}

export default ContactEdit;
