import { useEffect, useState } from "react";

type Sales = {
  id: string;
  username: string;
  volume: number;
};

const LastSalesPage = (): JSX.Element => {
  const [sales, setSales] = useState<Array<Sales>>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    setIsLoading(true);
    fetch("https://nextjs-afc54-default-rtdb.firebaseio.com/sales.json")
      .then((res) => res.json())
      .then((data) => {
        const transformedSales: Sales[] = [];
        Object.keys(data).map((key) => {
          const sale = {
            id: key,
            ...data[key],
          };
          transformedSales.push(sale);
        });
        setSales(transformedSales);
        setIsLoading(false);
      });
  }, []);

  if (isLoading) return <p>Loading...</p>;
  if (sales.length === 0) return <p>No data yet</p>;

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

export default LastSalesPage;
