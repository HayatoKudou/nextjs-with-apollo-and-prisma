import * as React from "react";
import {apolloClient} from "@/pages/_app";
import {CreateProductDocument, Product, ProductsDocument} from "@/graphql/generated";
import {useMutation} from "@apollo/client";

const Index = () => {
  const [createProductMutation] = useMutation(CreateProductDocument);
  const [inputValue, setInputValue] = React.useState({
    brandName: '',
    productName: ''
  });
  const [products, setProducts] = React.useState<Product[]>([]);

  React.useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = () => {
    apolloClient.cache.reset();
    apolloClient.query({ query: ProductsDocument }).then((res) => {
      setProducts(res.data.products);
    });
  }

  const handleSubmit = () => {
    if(!inputValue.brandName || !inputValue.productName) alert('無効な値です');
    createProductMutation({
      variables: {
        input: {
          brand_name: inputValue.brandName,
          product_name: inputValue.productName,
        },
      },
    }).then(() => {
      fetchProducts();
      setInputValue({brandName: '', productName: ''})
    });
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue({
      ...inputValue,
      [event.target.name]: event.target.value
    });
  };

  return (
    <>
      <div style={{display: "flex", gap: 5, marginBottom: 20}}>
        <input name="brandName" value={inputValue.brandName} placeholder={"ブランド名"} onChange={handleChange} />
        <input name="productName" value={inputValue.productName} placeholder={"商品名"} onChange={handleChange} />
        <button onClick={handleSubmit}>保存</button>
      </div>
      <table border={1}>
        <thead>
          <tr>
            <th>ブランド名</th>
            <th>商品名</th>
          </tr>
        </thead>
        <tbody>
        {products.map((product, index) => (
          <tr key={index}>
            <td>{product.brand_name}</td>
            <td>{product.product_name}</td>
          </tr>
        ))}
        </tbody>
      </table>
    </>
  )
}

export default Index;