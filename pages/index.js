import { useEffect, useState } from "react";
import Head from "next/head";

var locales = [
  "de-DE",
  "en-US",
  "hi-IN",
  "id-ID",
  "ja-JP",
  "th-TH",
  "zh-Hans-CN",
  "zh-Hant-TW"
];

var formatOptions = [
  {
    weekday: "long",
    year: "numeric",
    month: "numeric",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric"
  },
  { weekday: "long", year: "numeric", month: "numeric", day: "numeric" },
  { year: "numeric", month: "numeric", day: "numeric" },
  { year: "numeric", month: "numeric" },
  { month: "numeric", day: "numeric" },
  { hour: "numeric", minute: "numeric", second: "numeric" },
  { hour: "numeric", minute: "numeric" }
];

const numberingSystems = [
  "arab",
  "arabext",
  "bali",
  "beng",
  "deva",
  "fullwide",
  "gujr",
  "guru",
  "hanidec",
  "khmr",
  "knda",
  "laoo",
  "latn",
  "limb",
  "mlym",
  "mong",
  "mymr",
  "orya",
  "tamldec",
  "telu",
  "thai",
  "tibt"
];
const calendars = [
  "buddhist",
  "chinese",
  "coptic",
  "ethiopia",
  "ethiopic",
  "gregory",
  "hebrew",
  "indian",
  "islamic",
  "iso8601",
  "japanese",
  "persian",
  "roc"
];
const hourCycles = ["h11", "h12", "h23", "h24"];

const pickRandomly = arr => arr[Math.trunc(Math.random() * arr.length)];

const pickExtensions = () =>
  Object.entries({
    nu: pickRandomly(numberingSystems),
    ca: pickRandomly(calendars)
  });

const filterExtensions = extensions => extensions.filter(([_, v]) => v);

const localeFormat = (locale, extensions) =>
  extensions.reduce((pair, arr) => [...pair, ...arr], [locale, "u"]).join("-");

const Home = () => {
  const date = Date.now();
  const [extensions, setExtensions] = useState([]);
  const [locale, setLocale] = useState("en-US");

  useEffect(() => {
    const update = () => {
      setExtensions(filterExtensions(pickExtensions()));
      setLocale(pickRandomly(locales));
    };
    update();
    const interval = setInterval(update, 5000);
    return () => clearInterval(interval);
  }, []);

  const optionsList = () => [
    ["Locale", locale],
    ...extensions.map(([extCode, value]) => [
      {
        nu: "Numbering system",
        ca: "Calendar"
      }[extCode],
      value
    ])
  ];

  return (
    <div className="home">
      <Head>
        <title>Gaygenius</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <h1>The current date and time</h1>
      <div>
        <p>{new Intl.DateTimeFormat("en-US", formatOptions[0]).format(date)}</p>
        {extensions.length > 0 && (
          <div className="with-options">
            <ul className="datetimes">
              {formatOptions.map((options, i) => (
                <div key={i}>
                  {new Intl.DateTimeFormat(
                    localeFormat(locale, extensions),
                    options
                  ).format(date)}
                </div>
              ))}
            </ul>
            <ul className="options">
              {optionsList().map(([key, value]) => (
                <li key={key}>
                  <span className="option-name">{key}</span>
                  <span className="option-value">{value}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
      <style jsx>
        {`
          .home {
            font-family: Arial, Helvetica, sans-serif;
          }

          .with-options {
            margin: 0;
            padding: 10px;
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            align-items: flex-end;
            border: 1px solid;
            border-radius: 5px;
          }

          @media (max-width: 800px) {
            .with-options {
              flex-direction: column;
              align-items: flex-start;
            }
          }

          .with-options li {
            margin: 10px;
          }

          .datetimes {
            margin: 5px;
            padding: 0;
            display: flex;
            flex-direction: column;
          }

          .options {
            margin: 0;
            padding: 0;
            font-size: small;
          }

          .options li {
            display: flex;
            flex-direction: column;
          }

          .option-name {
            font-style: italic;
          }

          .option-value {
            font-family: Courier, monospace;
            margin: 0 3px;
            padding: 3px 10px;
            border: 1px solid;
            border-radius: 5px;
          }
        `}
      </style>
    </div>
  );
};

export default Home;
