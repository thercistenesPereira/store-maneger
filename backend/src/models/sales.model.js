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
  const [[sale]] = await connection.execute(
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
  return camelize(sale);
};

module.exports = { findAll, findById };