import Image from "next/image";

function Card({ character }: { character: RAMCharacter }) {
  const statusBarStyle = `border-${(() => {
    switch (character.status.toLowerCase()) {
      case "alive":
        return "green";
      case "dead":
        return "red";
      default:
        return "gray";
    }
  })()}-500`;

  return (
    <article className="flex m-2 bg-slate-50 shadow rounded-md overflow-hidden h-52 w-[36rem]">
      <div className={`w-1/3 relative border-r-8 ${statusBarStyle}`}>
        <Image
          src={character.image}
          layout="fill"
          alt={character.name}
          className="hover:scale-105 transition duration-1000 object-cover"
        />
      </div>
      <div className="w-2/3 px-5">
        <div className="mb-5 mt-3">
          <h2 className="text-slate-800 text-2xl font-bold tracking-tight">
            {character.name}
          </h2>
        </div>
        <div className="text-sm text-slate-900 tracking-wide">
          <p>{`${character.status || "n/a"} - ${
            character.species || "n/a"
          }`}</p>
          <p>{`location: ${character.location.name || "n/a"}`}</p>
          <p>{`episodes (${character.episode.length})`}</p>
        </div>
      </div>
    </article>
  );
}

export default Card;
