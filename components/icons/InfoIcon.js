export default function InfoIcon({ color = "#1893F8", width, height }) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 25 25"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle
        cx="12.5013"
        cy="12.4998"
        r="8.33333"
        stroke={color}
        strokeWidth="1.5"
      />
      <path
        d="M12.5 8.33325V13.3333"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <circle cx="12.5013" cy="15.8333" r="0.833333" fill={color} />
    </svg>
  );
}
