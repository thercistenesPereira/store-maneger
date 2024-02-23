const camelize = require('camelize');
const connection = require('./connection');

const findAll = async () => {
  const [sales] = await connection.execute(
    ` SELECT sales.id AS saleId, sales.date, sales_products.product_id
  AS productId, sales_products.quantity
  FROM sales
  JOIN sales_products ON sales.id = sales_products.sale_id`,
  );
  return camelize(sales);
};

const findById = async (saleId) => {
  const [sales] = await connection.execute(
    `
    SELECT sales.id AS saleId, sales.date,
    sales_products.product_id AS productId, sales_products.quantity
    FROM sales
    JOIN sales_products ON sales.id = sales_products.sale_id
    WHERE sales.id = ?
    ORDER BY sales.id ASC, sales_products.product_id ASC
    `,
    [saleId],
  );
  return sales.map((sale) => {
    const camelizedSale = camelize(sale);
    delete camelizedSale.saleId;
    return camelizedSale;
  });
};

const create = async () => {
  const [result] = await connection.execute(
    `
    INSERT INTO sales (date)
    VALUES (CURRENT_TIMESTAMP)
    `,
  );
  return result.insertId;
};

const createSaleProduct = async (saleId, productId, quantity) => {
  await connection.execute(
    `
    INSERT INTO sales_products (sale_id, product_id, quantity)
    VALUES (?, ?, ?)
    `,
    [saleId, productId, quantity],
  );
};

module.exports = { findAll, findById, create, createSaleProduct };