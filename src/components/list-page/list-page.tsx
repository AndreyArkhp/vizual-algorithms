import React from "react";
import DocumentTitle from "react-document-title";
import {SolutionLayout} from "../ui/solution-layout/solution-layout";

export const ListPage: React.FC = () => {
  return (
    <DocumentTitle title="Связный список">
      <SolutionLayout title="Связный список"></SolutionLayout>
    </DocumentTitle>
  );
};
