import { FragmentType, gql, useFragment } from "./generated";

const LOCATION_FRAGMENT = gql(`
  fragment LocationParts on Location {
    id
    name
    dimension
    type
  }
`);

export default function Location({
  location,
}: {
  location: FragmentType<typeof LOCATION_FRAGMENT>;
}) {
  const data = useFragment(LOCATION_FRAGMENT, location);

  return (
    <div>
      <p>Location: {data.name}</p>
      <p>Dimension: {data.dimension}</p>
    </div>
  );
}
