// Custom magnetic cursor (visual only — logic in useMagneticCursor)
export default function Cursor() {
  return (
    <>
      <div className="cursor" id="cursor" aria-hidden="true"></div>
      <div className="cursor cursor--dot" id="cursorDot" aria-hidden="true"></div>
    </>
  );
}
