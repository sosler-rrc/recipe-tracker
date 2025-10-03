import notFoundImage from "../assets/not-found-pikachu.png";

export function NotFound() {
  return (
    <div className="p-2">
      <img
        src={notFoundImage}
        className="w-150"
      />
      <span className="text-xl">Whoops, this page is not available.</span>
    </div>
  );
}
