import { GetServerSideProps } from "next";

type Props = {
  username: string;
};

const UserProfile = ({ username }: Props): JSX.Element => {
  return <h1>{username}</h1>;
};

export default UserProfile;

export const getServerSideProps: GetServerSideProps = async ({
  params,
  req,
  res,
}) => {
  console.log("Server Side Code", params, req, res);
  return {
    props: {
      username: "Max",
    },
  };
};
