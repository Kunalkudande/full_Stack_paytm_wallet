import { Link } from "react-router-dom";

export function BottomWarning({ label, buttonText, to }) {
  return (
    <div className="py-2 text-sm flex justify-center">
      <div className="mr-1">{label}</div>
      <Link
        className="text-blue-500 hover:underline focus:outline-none focus:underline"
        to={to}
      >
        {buttonText}
      </Link>
    </div>
  );
}
