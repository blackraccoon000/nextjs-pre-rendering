import React from "react";
import fs from "fs/promises";
import path from "path";
import Link from "next/link";

export type Product = { id: string; title: string; description: string };
export type Products = {
  products: Product[];
};
type Props = {
  props: {
    products: Product[];
  };
  revalidate: number;
};

type NotFound = {
  notFound: boolean;
};

type NoData = { redirect: { destination: "/no-data" } };

const HomePage = ({ products }: { products: Product[] }): JSX.Element => {
  return (
    <ul>
      {products.map((product: Product) => (
        <li key={product.id}>
          <Link href={`/${product.id}`}>{product.title}</Link>
        </li>
      ))}
    </ul>
  );
};

export const getStaticProps = async (): Promise<Props | NotFound | NoData> => {
  console.log("(Re-)Generating...");
  const filePath: string = path.join(
    process.cwd(),
    "data",
    "dummy-backend.json"
  );
  const jsonData: string = await fs.readFile(filePath, "utf8");
  const data: Products = JSON.parse(jsonData);

  if (!data) return { redirect: { destination: "/no-data" } };

  if (data.products.length === 0) return { notFound: true };

  return {
    props: {
      products: data.products,
    },
    revalidate: 10, // seconds
  };
};

export default HomePage;
