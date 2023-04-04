import { useSelector } from "react-redux";
import { selectIssues } from "../store/slices/buildpage/buildpageSlice";

export const useGetIssues = (category) => {
  console.log(
    "🚀 ~ file: useGetIssues.jsx:5 ~ useGetIssues ~ category:",
    category
  );
  const issues = useSelector(selectIssues);
  const errors = issues[category]?.filter(
    (issue) => issue.severity === "error"
  );
  const warnings = issues[category]?.filter(
    (issue) => issue.severity === "warning"
  );
  console.log(
    "🚀 ~ file: useGetIssues.jsx:12 ~ useGetIssues ~ warnings:",
    warnings
  );
  return {
    errors,
    isError: Boolean(errors.length),
    warnings,
    isWarning: Boolean(warnings.length),
  };
};
