import Head from "next/head";
import MaxSubarray from "../components/maxSubarray";
import DateAndTimeShowcase, {
  formatLongDateAndTime
} from "../components/dateAndTimeShowcase";

const Home = () => {
  const now = Date.now();
  return (
    <div className="home">
      <Head>
        <title>Gaygenius</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <h2>Algorithms</h2>
      <h3>
        Maximum subarray problem —
        <a href="https://en.wikipedia.org/wiki/Maximum_subarray_problem">
          [Wikipedia]
        </a>
      </h3>
      <MaxSubarray numbers={[-2, 1, -3, 4, -1, 2, 1, -5, 4]} />
      <hr />
      <MaxSubarray numbers={[-2, -4, -1, -5]} />

      <style jsx>
        {`
          .home {
            font-family: Arial, Helvetica, sans-serif;
          }
        `}
      </style>
    </div>
  );
};

export default Home;
