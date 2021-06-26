import React from "react";
import fs from "fs/promises";
import path from "path";

type Product = { id: string; title: string };
type Products = {
  products: Product[];
};
type Props = {
  props: {
    products: Product[];
  };
  revalidate: number;
};

const HomePage = ({ products }: { products: Product[] }): JSX.Element => {
  return (
    <ul>
      {products.map((product: Product) => (
        <li key={product.id}>{product.title}</li>
      ))}
    </ul>
  );
};

export const getStaticProps = async (): Promise<Props> => {
  console.log("(Re-)Generating...");
  const filePath: string = path.join(
    process.cwd(),
    "data",
    "dummy-backend.json"
  );
  const jsonData: string = await fs.readFile(filePath, "utf8");
  const data: Products = JSON.parse(jsonData);

  return {
    props: {
      products: data.products,
    },
    revalidate: 10, // seconds
  };
};

export default HomePage;
