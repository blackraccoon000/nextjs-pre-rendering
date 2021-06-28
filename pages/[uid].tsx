import { GetServerSideProps } from "next";

type Props = {
  id: string;
};

const UserIdPage = ({ id }: Props): JSX.Element => {
  return <h1>{id}</h1>;
};
export default UserIdPage;

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const userId = params?.uid;
  return {
    props: {
      id: `userid-${userId}`,
    },
  };
};
