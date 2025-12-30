import React from "react";
import { STATUS_COLORS } from "../utils/constants";
import { getStatusLabel } from "../utils/helpers";

export default function StatusBadge({ status, size = "sm" }) {
  const colorClass = STATUS_COLORS[status] || STATUS_COLORS.new;

  const sizeClasses = {
    xs: "px-1.5 py-0.5 text-xs",
    sm: "px-2 py-1 text-xs",
    md: "px-3 py-1 text-sm",
  };

  return (
    <span
      className={`
        inline-flex items-center rounded-full font-medium border
        ${colorClass}
        ${sizeClasses[size]}
      `}
    >
      {getStatusLabel(status)}
    </span>
  );
}
