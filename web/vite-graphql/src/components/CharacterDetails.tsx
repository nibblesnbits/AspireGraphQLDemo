import { useFragment } from "react-relay";
import type { CharacterDetails_character$key } from "@/fragments/__generated__/CharacterDetails_character.graphql";
import CharacterDetailsFragment from "@/fragments/CharacterDetails";

export default function CharacterDetails(props: {
  character: CharacterDetails_character$key;
}) {
  const data = useFragment(CharacterDetailsFragment, props.character);

  return (
    <>
      <h2>{data.name}</h2>
      <p>Character ID: {data.id}</p>
    </>
  );
}
