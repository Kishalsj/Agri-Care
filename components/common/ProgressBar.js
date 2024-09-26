export default function ProgressBar({
  completed,
  bgColor = "#1D1A4E",
  labelColor = "#FFFFFF",
  height = "20px",
}) {
  return (
    <div
      className={`progress-bar h-[${height}] w-full bg-[#E0E0DE] rounded-full m-[50]`}
    >
      <div
        className={`bg-[${bgColor}] h-full rounded-full text-right`}
        style={{ width: `${completed}%` }}
      >
        <span
          className={`p-2 text-[#FFFFFF] font-semibold`}
        >{`${completed}%`}</span>
      </div>
    </div>
  );
}
