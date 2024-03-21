export default function SecondaryButton({ textContent, href, onClick }) {
  if (!textContent) {
    textContent = "incomplete props";
  }

  if (onClick) {
    <button
      className="py-2 px-4 border-2 border-main rounded-md m-0 hover:text-white hover:border-mainHover hover:bg-mainHover active:text-white active:border-mainActive active:bg-mainActive"
      onClick={onClick}
    >
      {textContent}
    </button>;
  }
  return (
    <>
      {/* <Link href={href} > */}
      <button className="py-2 px-4 border-2 border-main rounded-md m-0 hover:text-white hover:border-mainHover hover:bg-mainHover active:text-white active:border-mainActive active:bg-mainActive">
        {textContent}
      </button>
      {/* </Link> */}
    </>
  );
}
