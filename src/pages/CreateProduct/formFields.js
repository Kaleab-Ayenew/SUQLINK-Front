export const formFields = [
  {
    type: "text",
    title: "Product Name",
    id: "product-name",
    name: "product_name",
  },
  {
    type: "file",
    title: "Product Image ( Thumbnail )",
    id: "product-image",
    name: "product_thumbnail",
    accept: "image/png,image/jpeg",
  },
  {
    type: "decimal",
    step: "0.01",
    title: "Product Price",
    id: "product-price",
    name: "product_price",
  },
  {
    type: "file",
    title: "Product File ( .zip files only )",
    id: "product-file",
    name: "product_file",
    accept: "application/zip",
  },
  {
    type: "textarea",
    title: "Product Description",
    name: "product_description",
  },
];
