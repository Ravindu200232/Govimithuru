import React, { useState } from 'react';

const AdminLogin = ({ onAdminLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onAdminLogin(email, password);
  };

  return (
    <form onSubmit={handleSubmit}>
     <a href='/login'>Back</a>
    </form>
  );
};

export default AdminLogin;
