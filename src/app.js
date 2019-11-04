import React, { Suspense, lazy } from "react";
import { Router, Link } from "@reach/router";
import icon from "./assets/Formidable-Icon.png";
import wordmark from "./assets/Formidable-Wordmark-White.png";

const chapters = [
  { name: "review" },
  { name: "context" },
  { name: "error-boundary" },
  { name: "hooks" },
  { name: "final" }
];

const Logo = () => {
  return (
    <div className="formidable-logo">
      <img src={icon} className="formidable-icon" alt="formidable-icon" />
      <img
        src={wordmark}
        className="formidable-wordmark"
        alt="formidable-wordmark"
      />
    </div>
  );
};

const Chapters = () => {
  return (
    <ul>
      {chapters.map(({ name }, idx) => {
        const id = ("0" + (idx + 1)).slice(-2);
        return (
          <Link key={id} to={`chapters/${id}-${name}`} className="chapter-link">
            <li className="chapter-item">
              <div className="chapter-title">{`${id} - ${name.toUpperCase()}`}</div>
            </li>
          </Link>
        );
      })}
    </ul>
  );
};

const TableOfContents = () => {
  return (
    <div className="home">
      <Logo />
      <Chapters />
    </div>
  );
};

const Chapter = ({ name, ...props }) => {
  const Component = lazy(() => import(`./chapters/${name}`));
  return <Component {...props} />;
};

const TrainingApp = ({ children }) => {
  return <div className="training-app">{children}</div>;
};

export default function FormidableTraining() {
  return (
    <>
      <Suspense fallback={<div>Loading...</div>}>
        <Router>
          <TableOfContents path="/" />
          <TrainingApp path="chapters">
            <Chapter path=":name" />
          </TrainingApp>
        </Router>
      </Suspense>
    </>
  );
}
