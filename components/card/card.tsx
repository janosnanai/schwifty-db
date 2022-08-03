import Image from "next/image";

function Card({ character }: { character: CharacterData }) {
  return (
    <div className="flex bg-slate-100 rounded-md overflow-hidden h-36 w-80">
      <div className="w-2/5 relative">
        <Image
          src={character.image}
          layout="fill"
          alt="schwifty stuff"
          className="hover:scale-105 transition duration-1000 object-cover"
        />
      </div>
      <div className="w-3/5 px-5">
        <div className="mb-3 mt-2">
          <h3 className="text-lg font-bold tracking-tight">{character.name}</h3>
        </div>
        <div className="text-sm">
          <p>{`status: ${character.status || "--"}`}</p>
          <p>{`species: ${character.species || "--"}`}</p>
          <p>{`gender: ${character.gender || "--"}`}</p>
        </div>
      </div>
    </div>
  );
}

export default Card;
