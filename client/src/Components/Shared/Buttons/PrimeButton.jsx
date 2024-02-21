export default function PrimButton({ textContent, onClick }) {
  //TODO ÄNDRA SÅ LINK ÄR KNAPPEN OCH INTE HAR EN KNAPP INOM SIG,  KNAPPAR SKA  ALLTID HA ONCLICK

  if (!textContent || !onClick) {
    textContent = "incomplete props";
  }

  if (onClick) {
    return (
      <button
        className="py-2 px-4 border-2 border-main rounded-md bg-main text-white hover:bg-mainHover active:bg-mainActive m-0"
        onClick={onClick}
      >
        {textContent}
      </button>
    );
  }

  return (
    <>
      {/* <Link href={href} > */}
      <button className="py-2 px-4 border-2 border-main rounded-md bg-main text-white hover:bg-mainHover active:bg-mainActive m-0">
        {textContent}
      </button>
      {/* </Link> */}
    </>
  );
}
