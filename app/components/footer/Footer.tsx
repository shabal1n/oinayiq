"use client";
import { Currency, Language } from "../../types";
import "./Footer.css";
import React, { useState } from "react";
import Select from "react-select";

function Languages() {
  const [selectedLanguage, setSelectedLanguage] = useState<Language | null>(
    null
  );

  const languages = [
    { value: "en", label: "English (UK)", icon: "🇬🇧" },
    { value: "kz", label: "Қазақ", icon: "🇰🇿" },
    { value: "ru", label: "Русский", icon: "🇷🇺" },
  ];

  const CustomSingleValue = ({ data }: { data: Language }) => (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        marginBlock: "auto",
        height: "100%",
      }}
    >
      {data.icon} {data.label}
    </div>
  );

  return (
    <div className="select-footer-button-container">
      <Select
        className={"select-footer-button"}
        defaultValue={selectedLanguage || languages[0]}
        onChange={setSelectedLanguage}
        options={languages}
        autoFocus={false}
        isSearchable={false}
        components={{
          SingleValue: CustomSingleValue,
        }}
        styles={{
          control: (provided) => ({
            ...provided,
            border: "none",
            outline: "none",
            boxShadow: "none",
            minHeight: "initial",
            height: "fit-content",
            margin: "none",
            padding: "none",
          }),
          valueContainer: (provided) => ({
            ...provided,
            padding: "0",
            margin: "0",
            display: "flex",
            alignItems: "center",
            border: "0.3em solid black",
            outline: "none",
            backgroundColor: "black",
          }),
          indicatorSeparator: (provided) => ({
            ...provided,
            display: "none",
          }),
          dropdownIndicator: (provided) => ({
            ...provided,
            borderColor: "white",
            color: "rgba(255, 255, 255, 0.2)",
          }),
          singleValue: (provided) => ({
            ...provided,
            color: "white",
          }),
          option: (provided, state) => ({
            ...provided,
            color: "white",
            backgroundColor: state.isFocused
              ? "rgba(255, 255, 255, 0.2)"
              : state.isSelected
              ? "rgba(255, 255, 255, 0.2)"
              : provided.backgroundColor,
          }),
        }}
      />
    </div>
  );
}

function Currencies() {
  const [selectedCurrency, setSelectedCurrency] = useState<Currency | null>(
    null
  );

  const currencies = [
    { value: "USD", label: "US Dollars", icon: "$" },
    { value: "KZT", label: "Тенге", icon: "₸" },
    { value: "RUB", label: "Рубли", icon: "₽" },
  ];

  const CustomSingleValue = ({ data }: { data: Currency }) => (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        marginBlock: "auto",
        height: "100%",
      }}
    >
      {data.label}, {data.icon}
    </div>
  );

  return (
    <div className="select-footer-button-container">
      <Select
        className={"select-footer-button"}
        defaultValue={selectedCurrency || currencies[0]}
        onChange={(value) => setSelectedCurrency(value)}
        options={currencies}
        autoFocus={false}
        isSearchable={false}
        components={{
          SingleValue: CustomSingleValue,
        }}
        styles={{
          control: (provided) => ({
            ...provided,
            border: "none",
            outline: "none",
            boxShadow: "none",
            minHeight: "initial",
            height: "fit-content",
            margin: "none",
            padding: "none",
          }),
          valueContainer: (provided) => ({
            ...provided,
            padding: "0",
            margin: "0",
            display: "flex",
            alignItems: "center",
            border: "0.3em solid black",
            outline: "none",
            backgroundColor: "black",
          }),
          indicatorSeparator: (provided) => ({
            ...provided,
            display: "none",
          }),
          dropdownIndicator: (provided) => ({
            ...provided,
            borderColor: "white",
            color: "rgba(255, 255, 255, 0.2)",
          }),
          singleValue: (provided) => ({
            ...provided,
            color: "white",
          }),
          option: (provided, state) => ({
            ...provided,
            color: "white",
            backgroundColor: state.isFocused
              ? "rgba(255, 255, 255, 0.2)"
              : state.isSelected
              ? "rgba(255, 255, 255, 0.2)"
              : provided.backgroundColor,
          }),
        }}
      />
    </div>
  );
}

export const Footer: React.FC = () => (
  <footer>
    <div className="footer-container">
      <div className="buttons-parent">
        <div className="language-currency">
          <h6>Language</h6>
          {Languages()}
          <h6>Currency</h6>
          {Currencies()}
        </div>
        <div className="company">
          <h6>Company</h6>
          <p>About Us</p>
          <p>Blog</p>
        </div>
        <div className="help">
          <h6>Contact us</h6>
          <p>FAQ</p>
          <p>Terms and conditions</p>
          <p>Privacy Policy</p>
        </div>
        <div className="payment-methods">
          <h6>Payment Methods</h6>
          <div className="methods-grid">
            <img src="images/payment-methods/image.webp" alt="visa" />
            <img src="images/payment-methods/image2.png" alt="mastercard" />
          </div>
        </div>
      </div>
      <div className="all-rights">
        <p>© 2024 Dopoynayiq. All rights reserved.</p>
      </div>
    </div>
  </footer>
);

export default Footer;
