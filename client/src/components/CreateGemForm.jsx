import { useEffect, useState } from "react";
import { useToken } from "../contexts/TokenContext";


const CreateGemForm = function({ onSuccess }) {

  const { user, error, validateToken } = useToken();

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
    images: "",
    type: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:5050/gems/create?user_id=${user.user_id}`, {
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
    }
  };

  return (
    <>
      <h1 className="text-lg font-semibold text-blue-600 italic text-2xl p-4 ">CreateGemForm component</h1>

      <form onSubmit={handleSubmit} className="CreateGemFormContainer">
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


    </>
  );
};

export default CreateGemForm;
