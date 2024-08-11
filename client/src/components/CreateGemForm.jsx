import { useEffect, useState } from "react";
import { useTokenContext } from "../contexts/TokenContext";
import "../styles/CreateGemForm.scss";
import { useUserContext } from "../contexts/UserContext";


const CreateGemForm = function(props) {
  const { userFromDB, setUserFromDB } = useUserContext();

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

    if (user) {
      try {
        const response = await fetch(`/api/gems/create?username=${user.name}&userId=${user.user_id}`, {
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

        // CURRENCY BLOCK
        const updateCurrency = async (key) => {
          await fetch(`/api/currency/${key}/1`, {
            method: "POST",
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(userFromDB),
          }).then(response => {
            if (response.status === 200) {
              const clone = { ...userFromDB };

              // Update currency
              clone.currency[key] += 1;
              setUserFromDB(clone);
            }
          });
        }

        let key;
        switch (formData.type) {
          case "food":
            key = "rubies"
            break;
          case "entertainment":
            key = "sapphires"
            break;
          case "outdoors":
            key = "emeralds"
            break;
          case "shopping":
            key = "topazs"
            break;
          case "nightlife":
            key = "amethysts"
            break;
          case "services":
            key = "citrines"
            break;
        }

        setTimeout(updateCurrency(key), 5000)
        // CURRENCY BLOCK
        const newGem = await response.json();
        props.onSuccess(newGem);



      } catch (error) {
        console.error('Failed to create gem:', error);
      }
    }
  };

  return (
    <div className="creategemform-container">
      <form onSubmit={handleSubmit} className={`creategemform`}>

        <div className="body">

          <div className="column-1">
            <label>
              Name of Gem:
              <input type="text" name="name" value={formData.name} onChange={handleChange} required />
            </label>
            <label>
              City:
              <input type="text" name="city" value={formData.city} onChange={handleChange} required />
            </label>
            <label>Select type:</label>
            <select
              type="text" name="type" value={formData.type} onChange={handleChange} className="type" required>
              <option value="">Select a type</option>
              <option value="food">Food</option>
              <option value="outdoors">Outdoors</option>
              <option value="shopping">Shopping</option>
              <option value="entertainment">Entertainment</option>
              <option value="nightlife">Nightlife</option>
              <option value="services">Services</option>
            </select>
            <br />
            <label>
              Address:
              <input type="text" name="address" value={formData.address} onChange={handleChange} required />
            </label>
          </div>

          <div className="column-2">
            <label>
              Latitude:
              <input type="text" name="latitude" value={formData.latitude} onChange={handleChange} required />
            </label>
            <label>
              Longitude:
              <input type="text" name="longitude" value={formData.longitude} onChange={handleChange} required />
            </label>
            <label>
              Images (please separate URLs by comma):
              <textarea type="text" name="images" className="images-input" value={formData.images} onChange={handleChange} required />
            </label>
          </div>

          <div className="column-3">
            <label>
              Tags (please separate by comma):
              <textarea type="text" name="tags" value={formData.tags} onChange={handleChange} required />
            </label>
            <label>
              Description:
              <textarea name="description" value={formData.description} onChange={handleChange} required placeholder="E.g. a hole in the wall pizza shop with giant slices" />
            </label>
            <label>
              What's so great about it?
              <textarea type="text" name="whats_great_about_it" value={formData.whats_great_about_it} onChange={handleChange} required placeholder="E.g. the 'OG Big Cheese' pizza" />
            </label>
          </div>
        </div>

        <div className="submit-section">
          <button type="submit">Submit</button>
        </div>

      </form >
      <br/>
    </div >
  );
};

export default CreateGemForm;
