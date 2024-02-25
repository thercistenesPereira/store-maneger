const camelize = require('camelize');
const connection = require('./connection');

const findAll = async () => {
  const [products] = await connection.execute('SELECT * FROM products');
  return camelize(products);
};

const findById = async (productId) => {
  const [[product]] = await connection.execute(
    'SELECT * FROM products WHERE id = ?',
    [productId],
  );
  return camelize(product);
};

const create = async (name) => {
  const [{ insertId }] = await connection.execute(
    'INSERT INTO products (name) VALUES (?)',
    [name],
  );
  return { id: insertId, name };
};

const update = async (id, name) => {
  await connection.execute('UPDATE products SET name = ? WHERE id = ?', [name, id]);
  return { id, name };
};

const remove = (id) => connection.execute('DELETE FROM products WHERE id = ?', [id]);

module.exports = { findAll, findById, create, update, remove };
