import "./ContactList.css";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from "./Button";

function ContactList() {
  const baseUrl = "http://localhost:3000/contacts";
  const [contacts, setContacts] = useState([]);
  const navigate = useNavigate();

  const LoadEdit = (id) => {
    navigate(`/edit-contact/${id}`);
  };
  
  const RemoveFunction = (id) => {

                // Confirm the deletion with the user
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this contact?"
    );

    if (confirmDelete) {
                // Send a DELETE request to the server to delete the contact
      fetch(`${baseUrl}/${id}`, {
        method: "DELETE",
      })
        .then((res) => {
          if (res.status === 200) {
            console.log("Contact deleted successfully!");
                // After successful deletion, update the contacts list
            setContacts((prevContacts) =>
              prevContacts.filter((contact) => contact.id !== id)
            );
          } else {
            console.error("Error deleting contact:", res.statusText);
          }
        })
        .catch((error) => {
          console.error("Error deleting contact:", error);
        });
    }
  };

  const LoadDetail = (id) => {
    navigate(`/ContactList/${id}`);
  };

  useEffect(() => {
    fetch(baseUrl)
      .then((res) => res.json())
      .then((data) => {
        setContacts(data);
      });
  }, []);



  return (
    <div>
      <div className="container-table">
        <Link to="/" className="btn btn-danger back-button">
          back
        </Link>

        <div className="card">
          <div className="card-title">
            <h1>contact list</h1>
          </div>
          <div className="card-body">
            <table class="table table-hover table-dark">
              <thead>
                <tr>
                  <th scope="col">id#</th>
                  <th scope="col">Name</th>
                  <th scope="col">Email Address</th>
                  <th scope="col">Phone Number</th>
                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody>
                {contacts.map((contact) => (
                  <tr key={contact.id}>
                    <th scope="row">{contact.id}</th>
                    <td>{contact.name}</td>
                    <td>{contact.email}</td>
                    <td>{contact.phone}</td>
                    <td>
                      <div className="btn-group">
                        <Button
                          onClick={() => {
                            LoadEdit(contact.id);
                          }}
                          className="btn btn-success"
                          marginRight="10px"
                        >
                          {"Edit"}
                        </Button>

                        <Button
                          className={"btn btn-danger"}
                          marginRight="10px"
                          onClick={() => {
                            RemoveFunction(contact.id);
                          }}
                        >
                          {"Delete"}
                        </Button>

                        <Button
                          onClick={() => {
                            LoadDetail(contact.id);
                          }}
                          className="btn btn-info"
                        >
                          {"View"}
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ContactList;
