// var lengthOfLastWord = function(s) {
//   let result = 0;
//   let index = s.length - 1;
//   if (index < 0) {
//     return 0;
//   }
//   while (index > 0 && s[index] === " ") {
//     --index;
//   }
//   while (index >= 0 && s[index] !== " ") {
//     result++;
//     index--;
//   }
//   return result;
// };

interface Step {
  currentChar: string;
  lastWordLength: number;
}

const stepsForLengthOfLastWord = (
  str: string
): { lastWordLength: number; steps: Array<Step> } => {
  const steps: Array<Step> = [];
  let lastWordLength = 0;
  let index = str.length - 1;
  if (index >= 0) {
    while (index > 0 && str[index] === " ") {
      steps.push({ currentChar: "_", lastWordLength });
      index--;
    }
    while (index >= 0 && str[index] !== " ") {
      lastWordLength++;
      steps.push({ currentChar: str[index], lastWordLength });
      index--;
    }
  }
  return {
    lastWordLength,
    steps
  };
};

const Steps = ({ steps }) => (
  <div className="steps-grid">
    <div className="column-heading">char</div>
    <div className="column-heading">lastWordLength</div>
    {steps.map(({ currentChar, lastWordLength }, index) => (
      <>
        <div key={`char_${index}`} className="char">
          {currentChar}
        </div>
        <div key={`lastWordLength_${index}`}>{lastWordLength}</div>
      </>
    ))}
    <style jsx>{`
      .steps-grid {
        margin: 0 20px;
        display: grid;
        grid-template-columns: repeat(2, auto);
        justify-items: center;
        row-gap: 10px;
      }
      .column-heading {
        font-size: small;
        font-weight: bold;
      }
      .char {
        border: 1px solid;
        font-family: monospace;
        padding: 2px;
      }
    `}</style>
  </div>
);

interface LengthOfLastWordProps {
  str: string;
}

const LengthOfLastWord = ({ str }: LengthOfLastWordProps) => {
  const { lastWordLength, steps } = stepsForLengthOfLastWord(str);
  return (
    <div>
      <div>
        <strong>
          Input: <span className="input">{str.replace(/ /g, "_")}</span>
        </strong>
      </div>
      <div className="steps-container">
        <Steps steps={steps} />
      </div>
      <div>
        <strong>Output: {lastWordLength}</strong>
      </div>
      <style jsx>{`
        .steps-container {
          border: 1px dashed;
          border-radius: 10px;
          padding: 10px;
          margin: 10px;
        }
        .input {
          font-family: monospace;
          letter-spacing: 2px;
          padding: 2px;
        }
      `}</style>
    </div>
  );
};

export default LengthOfLastWord;
