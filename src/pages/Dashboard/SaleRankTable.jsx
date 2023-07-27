import React from "react";
import { round } from "lodash";
import { Link } from "react-router-dom";
import { Row, Col, Card, CardBody, CardTitle, Table } from "reactstrap";

function SaleRankTable(props) {
  const stdata = props.statData;
  const tableNames = {
    product_name: "Product Name",
    product_total_sales: "Total Product Sales",
    product_total_income: "Total Product Sale Income (ETB)",
    edit_link: "Edit Product",
    product_link: "Product Link",
    product_price: "Product Price",
  };
  let sales_rank_data = [];
  stdata.product_stats.forEach((product) => {
    let completed_sales = product.product_sales.filter((item) => {
      return item.completed === true;
    });
    sales_rank_data.push({
      product_name: product.product_name,
      product_price: product.product_price,
      product_total_sales: completed_sales.length,
      product_total_income: round(
        completed_sales.length * parseFloat(product.product_price) * 0.8,
        2
      ),
      edit_link: [
        <Link to={"/edit/" + product.product_id}>edit product info</Link>,
      ],
      product_link: `https://p.suqlink.com/p/${product.product_id}`,
    });
  });
  const data = sales_rank_data;

  return (
    <Row>
      <Col>
        <Card>
          <CardBody>
            <CardTitle className="h4">All Products</CardTitle>
            {/* <CardSubtitle className="card-title-desc">
              
            </CardSubtitle> */}

            <div className="table-responsive">
              <Table className="table table-striped mb-0">
                <thead>
                  <tr>
                    {data[0] &&
                      Object.keys(data[0]).map((k) => <th>{tableNames[k]}</th>)}
                  </tr>
                </thead>
                <tbody>
                  {data.map((sale) => (
                    <tr>
                      {Object.values(sale).map((val, index) => {
                        return <td>{val}</td>;
                      })}
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>
          </CardBody>
        </Card>
      </Col>
    </Row>
  );
}

export default SaleRankTable;
