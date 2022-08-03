import Link from "next/link";

function Navbar() {
  return (
    <nav className="px-12 py-4">
      <div className="inline-block">
        <Link href="#">
          <a className="font-bold text-xl">schwiftyDB</a>
        </Link>
      </div>
      <div className="inline-block ml-7 space-x-3">
        <Link href="#">
          <a>characters</a>
        </Link>
        <Link href="#">
          <a>locations</a>
        </Link>
        <Link href="#">
          <a>episodes</a>
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;
