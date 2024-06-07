import React, { useState, ChangeEvent, FormEvent } from 'react';
import './info.css';

interface InformationProps {
  onClose: () => void;
}

interface FormData {
  deliveryOption: string;
  fullNameOrCompany: string;
  email: string;
  phoneNumber: string;
  postalCode: string;
  city: string;
  deliveryAddress: string;
}

const Information: React.FC<InformationProps> = ({ onClose }) => {
  const [formData, setFormData] = useState<FormData>({
    deliveryOption: '',
    fullNameOrCompany: '',
    email: '',
    phoneNumber: '',
    postalCode: '',
    city: '',
    deliveryAddress: ''
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    console.log(formData);
  };

  const handleClose = () => {
    if (onClose) onClose(); // Assuming onClose toggles the visibility of the Information component
  };

  return (
    <form className="formeBox" onSubmit={handleSubmit}>
      <div className="divBut">
        <button type="button" className="closeButton" onClick={handleClose}>
          X
        </button>
      </div>
      <div className="section secondSection">
        <label htmlFor="fullNameOrCompany">Nom complet ou Société</label>
        <input
          className="label-class"
          type="text"
          id="fullNameOrCompany"
          name="fullNameOrCompany"
          value={formData.fullNameOrCompany}
          onChange={handleChange}
        />
      </div>
      <div className="secondSection">
        <label htmlFor="email">Email</label>
        <input
          className="label-class"
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
        />
      </div>
      <div className="secondSection">
        <label htmlFor="phoneNumber">Numéro de téléphone</label>
        <input
          className="label-class"
          type="tel"
          id="phoneNumber"
          name="phoneNumber"
          value={formData.phoneNumber}
          onChange={handleChange}
        />
      </div>
      <div className="Optiondelivraison secondSection">
        <label htmlFor="deliveryOption" className="label-deliveryOption">
          Option de livraison
        </label>
        <select
          id="deliveryOption"
          name="deliveryOption"
          value={formData.deliveryOption}
          className="delivery-option-select"
          onChange={handleChange}
        >
          <option value="storePickup">Retrait du magasin</option>
          <option value="homeDelivery">Livraison à domicile</option>
        </select>
      </div>
      {formData.deliveryOption === 'homeDelivery' && (
        <>
          <div className="secondSection">
            <label htmlFor="deliveryAddress">Adresse de livraison</label>
            <input
              className="label-class"
              type="text"
              id="deliveryAddress"
              name="deliveryAddress"
              value={formData.deliveryAddress}
              onChange={handleChange}
            />
          </div>
          <div className="secondSection">
            <label htmlFor="city">Ville</label>
            <input
              className="label-class"
              type="text"
              id="city"
              name="city"
              value={formData.city}
              onChange={handleChange}
            />
          </div>
          <div className="secondSection">
            <label htmlFor="postalCode">Code Postal</label>
            <input
              className="label-class"
              type="text"
              id="postalCode"
              name="postalCode"
              value={formData.postalCode}
              onChange={handleChange}
            />
          </div>
        </>
      )}
      <div className="container">
        <button type="submit" className="nav-btn">
          Envoyer
        </button>
      </div>
    </form>
  );
};

export default Information;
