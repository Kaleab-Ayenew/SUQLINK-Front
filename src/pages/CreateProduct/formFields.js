export const formFields = [
  {
    type: "text",
    title: "Product Name",
    id: "product-name",
    name: "product_name",
  },
  {
    type: "file",
    title: "Product Image ( JPG or PNG )",
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
    title: "Product File ( .zip or .rar files less than 50MB )",
    id: "product-file",
    name: "product_file",
    accept: "application/zip,application/vnd.rar",
  },
  {
    type: "text",
    title: "Product Short Description",
    name: "product_short_description",
  },
  {
    type: "textarea",
    title: "Product Detailed Description",
    name: "product_description",
  },
];
