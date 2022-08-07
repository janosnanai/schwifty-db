import Link from "next/link";

function Navbar() {
  return (
    <nav className="px-12 py-4">
      <div className="inline-block">
        <Link href="/">
          <a className="font-bold text-3xl text-slate-900">schwiftyDB</a>
        </Link>
      </div>
      <div className="inline-block text-xl ml-12 space-x-7 text-slate-600">
        <Link href="/characters">
          <a className="hover:text-slate-900">characters</a>
        </Link>
        <Link href="/locations">
          <a className="hover:text-slate-900">locations</a>
        </Link>
        <Link href="/episodes">
          <a className="hover:text-slate-900">episodes</a>
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;
