import Head from "next/head";
import MaxSubarray from "../components/maxSubarray";
import LengthOfLastWord from "../components/lengthOfLastWord";
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
      <div className="exampleSeparator" />
      <MaxSubarray numbers={[-2, -4, -1, -5]} />

      <div className="algorithmSeparator" />
      <h3>
        Length of last word —
        <a href="https://leetcode.com/problems/length-of-last-word">
          [LeetCode]
        </a>
      </h3>
      <LengthOfLastWord str="Hello World  " />

      <style jsx>
        {`
          .home {
            font-family: Arial, Helvetica, sans-serif;
          }
          .exampleSeparator {
            border: 1px dotted;
          }
          .algorithmSeparator {
            border: 5px double;
          }
        `}
      </style>
    </div>
  );
};

export default Home;
