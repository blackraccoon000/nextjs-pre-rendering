import { useEffect, useState } from "react";
import useSWR from "swr";
// import { GetStaticProps } from "next";

type Sales = {
  id: string;
  username: string;
  volume: number;
};

const LastSalesPage = (): JSX.Element => {
  const [sales, setSales] = useState<Array<Sales>>([]);
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
  if (!data || sales.length === 0) return <p>Loading...</p>;

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

// const getData = async () => {
//   const url = "https://nextjs-afc54-default-rtdb.firebaseio.com/sales.json";
//   const data = fetch(url).then((res) => res.json);
//   const transformedSales: Sales[] = [];
//   if (data) {
//     Object.keys(data).map((key) => {
//       transformedSales.push({
//         id: key,
//         username: data[key].username,
//         volume: data[key].volume,
//       });
//     });
//   }
// };
//
// export const getStaticProps: GetStaticProps = async () => {};

export default LastSalesPage;
