import React from "react";
import DocumentTitle from "react-document-title";
import {SolutionLayout} from "../ui/solution-layout/solution-layout";

export const StackPage: React.FC = () => {
  return (
    <DocumentTitle title="Стек">
      <SolutionLayout title="Стек"></SolutionLayout>
    </DocumentTitle>
  );
};
