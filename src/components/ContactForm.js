import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import Image from '../assets/contact-image.jpg';
import Button from "./Button";



function ContactForm() {
  const baseUrl = 'http://localhost:3000/contacts';
  // const [id, idChange] = useState("");
  const [name, nameChange] = useState("");
  const [email, emailChange] = useState("");
  const [phone, phoneChange] = useState("");
  const [errors, setErrors] = useState({});
  const navigate=useNavigate();


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

  const handleSubmit = (e) => {
    e.preventDefault();
    const isValid = validateForm();
    if (isValid) {
      const newContact = {
      name,
      email,
      phone,
  };
 

  fetch(baseUrl,{
    method:"POST",
    headers:{"Content-Type":"application/json",
  },
    body:JSON.stringify(newContact),
  }).then((res)=> res.json())
    .then((data) => {
      console.log("contact added successfully!", data);
      navigate('/ContactList');
    }).catch((error) => {
      console.log("error adding contact:", error)
    });

  
 
  nameChange('');
  emailChange('');
  phoneChange('');
}
};



  return (
    <div className='container'>
            <div>
            <img src={Image} alt='man with contact icon' /> 
            </div>
            <div className="contact-form">
    <div className="contact-form">
      <h2>Contact Management</h2>
      <form onSubmit={handleSubmit}>
      <div>
        <label>Name:</label>
        <input type="text" value={name} onChange={(e) => nameChange(e.target.value)} />
        {errors.name && <div className="error">{errors.name}</div>}
      </div>
      <div>
        <label>Email:</label>
        <input type="email" value={email} onChange={(e) => emailChange(e.target.value)} />
        {errors.email && <div className="error">{errors.email}</div>}
      </div>
      <div> 
        <label>Phone Number:</label>
        <input type="tel" value={phone} onChange={(e) => phoneChange(e.target.value)} />
        {errors.phone && <div className="error">{errors.phone}</div>}
      </div>
      
     
      <Button  bgColor="#347672" borderRadius="15px" marginTop="20px" onClick={handleSubmit}>{"Add Contact"}</Button>
   
      <br></br>
      <span>access Contact List? <Link to="/ContactList">click here</Link> </span>
    </form>
    </div>
    </div>
    </div>
  );
}

export default ContactForm;
