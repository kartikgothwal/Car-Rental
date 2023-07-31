import { useEffect, useState } from "react";
import axios from "axios";

const ProductsData = (OriginalComponent, limit) => {
  const FetchData = (props) => {
    const [products, setProducts] = useState([]);
    const getProductsData = () => {
      if (limit) {
        axios
          .get(`http://localhost:8000/products?limit=${limit}`)
          .then((response) => {
            setProducts(response.data);
          })
          .catch((error) => console.log("error heere with axios", error));
      } else {
        axios
          .get(`http://localhost:8000/products`)
          .then((response) => {
            setProducts(response.data);
          })
          .catch((error) => console.log("error heere with axios", error));
      }
    };
    useEffect(() => {
      getProductsData();
    }, []);

    return (
      <OriginalComponent {...props} limit={limit} productList={products} />
    );
  };
  return FetchData;
};

export default ProductsData;
