import React from "react";
import DocumentTitle from "react-document-title";
import {SolutionLayout} from "../ui/solution-layout/solution-layout";

export const QueuePage: React.FC = () => {
  return (
    <DocumentTitle title="Очередь">
      <SolutionLayout title="Очередь"></SolutionLayout>
    </DocumentTitle>
  );
};
