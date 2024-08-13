import React, { useState } from "react";

const UserForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    // Şu anki tarih ve saati al
    const timestamp = new Date().toISOString();

    // Form verilerini JSON formatında oluştur
    const formData = {
      timestamp, // Zaman damgasını ekle
      name: {
        type: "text",
        value: name,
      },
      email: {
        type: "email",
        value: email,
      },
    };

    // JSON verilerini stringe çevir
    const jsonString = JSON.stringify(formData, null, 2);

    // JSON dosyasını oluştur ve kullanıcıya indirme linki sun
    const blob = new Blob([jsonString], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "formData.json";
    a.click();
    URL.revokeObjectURL(url); // Bellekteki URL'yi temizle

    alert("Form data has been saved as JSON!");
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <button type="submit">Submit</button>
    </form>
  );
};

export default UserForm;
