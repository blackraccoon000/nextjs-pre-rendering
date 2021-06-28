import { Fragment } from "react";
import { GetStaticPaths, GetStaticProps } from "next";
import { ParsedUrlQuery } from "querystring";
import path from "path";
import fs from "fs/promises";
import { Product, Products } from "../index";

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
  // Loading Flag
  if (!loadedProduct) return <p>Loading...</p>;
  return (
    <Fragment>
      <h1>{loadedProduct.title}</h1>
      <p>{loadedProduct.description}</p>
    </Fragment>
  );
};

const getData = async () => {
  const filePath: string = path.join(
    process.cwd(),
    "data",
    "dummy-backend.json"
  );
  const jsonData: string = await fs.readFile(filePath, "utf8");
  const data: Products = JSON.parse(jsonData);
  return data;
};

/**
 * @param params
 * https://zenn.dev/eitches/articles/2021-0424-getstaticprops-type
 */
export const getStaticProps: GetStaticProps<Props, Params> = async ({
  params,
}) => {
  const productId = params?.pid;
  const data = await getData();
  const product: Product | undefined = data.products.find(
    (product) => product.id === productId
  );

  // Not Found Flag
  if (!product) return { notFound: true };

  return {
    props: {
      loadedProduct: product,
    },
  };
};
// data.products.id
export const getStaticPaths: GetStaticPaths<Params> = async () => {
  const data = await getData();
  const ids = data.products.map((product) => product.id);

  // Auto Pid Generated
  const paths = ids.map((id) => ({ params: { pid: id } }));
  return {
    paths,
    fallback: true,
  };
};

export default ProductDetailPage;
