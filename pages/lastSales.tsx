import { useEffect, useState } from "react";
import useSWR from "swr";
import { GetStaticProps } from "next";

type Sales = {
  id: string;
  username: string;
  volume: number;
};

type Props = {
  transformedSales: Sales[];
};

const LastSalesPage = ({
  transformedSales,
}: {
  transformedSales: Sales[];
}): JSX.Element => {
  const [sales, setSales] = useState<Array<Sales>>(transformedSales);
  const url = "https://nextjs-afc54-default-rtdb.firebaseio.com/sales.json";
  const { data, error } = useSWR(url);

  useEffect(() => {
    const transformedSales: Sales[] = [];
    if (data) {
      Object.keys(data).map((key) => {
        const sale = {
          id: key,
          ...data[key],
        };
        transformedSales.push(sale);
        setSales(transformedSales);
      });
    }
  }, [data]);

  if (error) return <p>Failed to load.</p>;
  if (!data && sales.length === 0) return <p>Loading...</p>;

  return (
    <ul>
      {sales.map((sale) => (
        <li key={sale.id}>
          {sale.username} - {sale.volume}
        </li>
      ))}
    </ul>
  );
};

export const getStaticProps: GetStaticProps<Props> = async () => {
  const transformedSales: Sales[] = [];
  const response = await fetch(
    "https://nextjs-afc54-default-rtdb.firebaseio.com/sales.json"
  );
  const data = response.json();

  Object.keys(data).map((key) => {
    transformedSales.push({
      id: key,
      ...data[key],
    });
  });

  return {
    props: {
      transformedSales,
    },
    // revalidate: 10,
  };
};

export default LastSalesPage;
