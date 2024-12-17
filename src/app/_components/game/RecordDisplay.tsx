import React from "react";

type RecordDisplayProps = {
  currentRecord: number;
  bestRecord: number;
};

const RecordDisplay = ({ currentRecord, bestRecord }: RecordDisplayProps) => {
  // 1/1 -> 1/2, 2 -> 1/4, etc.
  const formatRecord = (record: number) =>
    `1/${record === 1 ? 1 : 2 ** (record - 1)}`;

  return (
    <div className="mt-2 text-xl font-semibold">
      <div>現在の記録: {formatRecord(currentRecord)}</div>
      <div className="my-2">ベスト記録: {formatRecord(bestRecord)}</div>
    </div>
  );
};

export default RecordDisplay;
