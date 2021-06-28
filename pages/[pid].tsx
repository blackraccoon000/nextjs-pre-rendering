import { Fragment } from "react";
import { GetStaticPaths, GetStaticProps } from "next";
import { ParsedUrlQuery } from "querystring";
import path from "path";
import fs from "fs/promises";
import { Product, Products } from "./index";

type Props = {
  loadedProduct: Product | undefined;
};

type Params = {
  pid: string;
} & ParsedUrlQuery;

const ProductDetailPage = ({
  loadedProduct,
}: {
  loadedProduct: Product;
}): JSX.Element => {
  return (
    <Fragment>
      <h1>{loadedProduct.title}</h1>
      <p>{loadedProduct.description}</p>
    </Fragment>
  );
};

/**
 * @param params
 * https://zenn.dev/eitches/articles/2021-0424-getstaticprops-type
 */
export const getStaticProps: GetStaticProps<Props, Params> = async ({
  params,
}) => {
  const productId = params?.pid;
  console.log("pd:", productId);
  const filePath: string = path.join(
    process.cwd(),
    "data",
    "dummy-backend.json"
  );
  const jsonData: string = await fs.readFile(filePath, "utf8");
  const data: Products = JSON.parse(jsonData);
  const product: Product | undefined = data.products.find(
    (product) => product.id === productId
  );

  return {
    props: {
      loadedProduct: product,
    },
  };
};

export const getStaticPaths: GetStaticPaths<Params> = async () => {
  return {
    paths: [
      { params: { pid: "p1" } },
      { params: { pid: "p2" } },
      { params: { pid: "p3" } },
      { params: { pid: "p4" } },
      { params: { pid: "p5" } },
    ],
    fallback: false,
  };
};

export default ProductDetailPage;
