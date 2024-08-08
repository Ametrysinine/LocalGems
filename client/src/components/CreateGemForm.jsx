import { useEffect, useState } from "react";
import { useTokenContext } from "../contexts/TokenContext";
import "../styles/CreateGemForm.scss";



const CreateGemForm = function({ onSuccess }) {

  const { user, error, validateToken } = useTokenContext();

  useEffect(() => {
    if (!user) {
      validateToken(localStorage.getItem(`token`));
    }
  }, [user]);

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    city: "",
    address: "",
    latitude: "",
    longitude: "",
    images: [],
    type: "",
    tags: [],  
    whats_great_about_it: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "images" || name === "tags") {
      // Handle arrays for images and tags
      setFormData({
        ...formData,
        [name]: value.split(',').map(item => item.trim()),
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

const handleSubmit = async (e) => {
    e.preventDefault();
    if (user) {try {
      const response = await fetch(`http://localhost:5050/gems/create?username=${user.name}&userId=${user.user_id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      if (!response.ok) {
        const message = `An error occurred: ${response.statusText}`;
        console.error(message);
        return;
      }
      const newGem = await response.json();
      onSuccess(newGem);
    } catch (error) {
      console.error('Failed to create gem:', error);
    }}
  };

  return (
    <div className="CreateGemFormContainer">
      <form onSubmit={handleSubmit}>
        <label>
          Name of Gem:
          <input type="text" name="name" value={formData.name} onChange={handleChange} required />
        </label>
        <br />
        <label>
          Description:
          <textarea name="description" value={formData.description} onChange={handleChange} required />
        </label>
        <br />
        <label>
          City:
          <input type="text" name="city" value={formData.city} onChange={handleChange} required />
        </label>
        <br />
        <label>
          Address:
          <input type="text" name="address" value={formData.address} onChange={handleChange} required />
        </label>
        <br />
        <label>
          Latitude:
          <input type="text" name="latitude" value={formData.latitude} onChange={handleChange} required />
        </label>
        <br />
        <label>
          Longitude:
          <input type="text" name="longitude" value={formData.longitude} onChange={handleChange} required />
        </label>
        <br />
        <label>
          Images (please separate URLs by comma):
          <input type="text" name="images" value={formData.images} onChange={handleChange} required />
        </label>
        <br />
        <label>
          Tags (please separate by comma):
          <input type="text" name="tags" value={formData.tags} onChange={handleChange} required />
        </label>
        <br />
        <label>
          What's great about it?
          <textarea type="text" name="whats_great_about_it" value={formData.whats_great_about_it} onChange={handleChange} required />
        </label>
        <br />
        <label>Select type:</label>
          <select
            type="text" name="type" value={formData.type} onChange={handleChange} required>
            <option value="">Select a type</option>
            <option value="food">Food</option>
            <option value="outdoors">Outdoors</option>
            <option value="shopping">Shopping</option>
            <option value="entertainment">Entertainment</option>
            <option value="nightlife">Nightlife</option>
            <option value="services">Services</option>
          </select>
        <br />
        <button type="submit">Submit</button>
      </form>

    </div>
  );
};

export default CreateGemForm;
