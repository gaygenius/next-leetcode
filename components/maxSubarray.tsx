import React from "react";

// var maxSubArray = function(nums) {
//   let bestSum = -Infinity;
//   let currentSum = 0;
//   nums.forEach(x => {
//     currentSum = Math.max(x, currentSum + x);
//     bestSum = Math.max(bestSum, currentSum);
//   });
//   return bestSum;
// };

const NumberBox = ({ number: number }) => (
  <span className="numberBox">
    {number}
    <style jsx>
      {`
        .numberBox {
          padding: 2px 4px;
          margin: 0 4px;
          border: 1px solid black;
          border-radius: 4px;
        }
      `}
    </style>
  </span>
);

const NumberBoxGroup = ({ numbers }) => (
  <>
    {numbers.map((number, index) => (
      <span key={index}>
        <NumberBox number={number}></NumberBox>
      </span>
    ))}
  </>
);

interface Step {
  number: number;
  currentGroup: Array<number>;
  currentSum: number;
  bestSum: number;
}

const stepsForMaxSubArray = (
  numbers: Array<number>
): { bestSum: number; steps: Array<Step> } => {
  let currentGroup = [];
  let currentSum = 0;
  let bestSum = -Infinity;
  const steps = numbers.map(number => {
    currentSum = Math.max(number, currentSum + number);
    if (number < currentSum) {
      currentGroup.push(number);
    } else {
      currentGroup = [number];
    }
    bestSum = Math.max(bestSum, currentSum);
    return {
      number,
      currentGroup: currentGroup.slice(),
      currentSum,
      bestSum
    };
  });
  return { bestSum, steps };
};

const Steps = ({ steps }) => (
  <div className="steps-grid">
    <div className="column-heading">n</div>
    <div className="column-heading">group</div>
    <div className="column-heading">group sum</div>
    <div className="column-heading">max sum so far</div>
    {steps.map((step, index) => (
      <React.Fragment key={index}>
        <NumberBox number={step.number} />
        <div>
          <NumberBoxGroup numbers={step.currentGroup} />
        </div>
        <div>{step.currentSum}</div>
        <div>{step.bestSum}</div>
      </React.Fragment>
    ))}
    <style jsx>{`
      .steps-grid {
        margin: 0 20px;
        display: grid;
        grid-template-columns: repeat(4, auto);
        justify-content: space-between;
        justify-items: center;
        row-gap: 10px;
      }
      .column-heading {
        font-size: small;
        font-weight: bold;
      }
    `}</style>
  </div>
);

interface MaxSubarrayProps {
  numbers: Array<number>;
}

const MaxSubarray = ({ numbers }: MaxSubarrayProps) => {
  const { bestSum, steps } = stepsForMaxSubArray(numbers);
  return (
    <div className="algorithm">
      <strong>
        Input:{" "}
        {numbers.map((x, index) => (
          <NumberBox number={x} key={index}></NumberBox>
        ))}
      </strong>
      <div className="steps-container">
        <Steps steps={steps} />
      </div>
      <strong>Result: {bestSum}</strong>
      <style jsx>{`
        .algorithm {
          margin: 20px 0;
        }

        .steps-container {
          border: 1px dashed;
          border-radius: 10px;
          padding: 10px;
          margin: 10px;
        }
      `}</style>
    </div>
  );
};

export default MaxSubarray;
