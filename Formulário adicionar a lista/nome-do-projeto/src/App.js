import React, { useState } from 'react';

const ProductForm = () => {
  const [product, setProduct] = useState({ name: '', value: '', description: '' });
  const [productList, setProductList] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setProductList([...productList, product]);
    setProduct({ name: '', value: '', description: '' });
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Nome do Produto:</label>
          <input type="text"
            id="name"
            name="name"
            value={product.name}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="value">Valor do Produto:</label>
          <input
            type="text"
            id="value"
            name="value"
            value={product.value}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="description">Descrição do Produto:</label>
          <input
            type="text"
            id="description"
            name="description"
            value={product.description}
            onChange={handleChange}
          />
        </div>
        <button type="submit">Cadastrar</button>
      </form>

      <h2>Lista de Produtos:</h2>
      <ul>
        {productList.map((product, index) => (
          <li key={index}>
            <strong>Nome:</strong> {product.name} <br />
            <strong>Valor:</strong> {product.value} <br />
            <strong>Descrição:</strong> {product.description}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductForm;
