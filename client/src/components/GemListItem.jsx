import Modal from "./Modal";
import { dateConversion, xssSanitize } from "./helpers/helperFunctions";
import "../styles/GemListItem.scss";


// takes in a single Gem as props
const GemListItem = (props) => {

  const gemImage = () => {
    switch (props.gem.type) {
      case 'food':
        return <img src="/assets/flaticons/gem_ruby.png" alt="Ruby - Food" />;
      case 'entertainment':
        return <img src="/assets/flaticons/gem_sapphire.png" alt="Sapphire - Entertainment" />;
      case 'outdoors':
        return <img src="/assets/flaticons/gem_emerald.png" alt="Emerald - Outdoor Activity" />;
      case 'shopping':
        return <img src="/assets/flaticons/gem_topaz.png" alt="Topaz - Shopping" />;
      case 'nightlife':
        return <img src="/assets/flaticons/gem_amethyst.png" alt="Amethyst - Nightlife" />;
      case 'services':
        return <img src="/assets/flaticons/gem_citrine.png" alt="Citrine - Services" />;
    }
  };

  return(
    
  <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
    <td className="p-4 align-middle [&:has([role=checkbox])]:pr-0">
      {props.gem.name}
    </td>
    <td className="p-4 align-middle [&:has([role=checkbox])]:pr-0">
      {props.gem.description}
    </td>
    <td className="p-4 align-middle [&:has([role=checkbox])]:pr-0">
      {props.gem.city}
    </td>
    <td className="p-4 align-middle [&:has([role=checkbox])]:pr-0">
      {props.gem.images}
    </td>
    <td className="p-4 align-middle [&:has([role=checkbox])]:pr-0">
      {props.gem.total_score}
    </td>
    <td className="p-4 align-middle [&:has([role=checkbox])]:pr-0">
      {dateConversion(props.gem.date_shared)}
    </td>
    <td className="p-4 align-middle [&:has([role=checkbox])]:pr-0">
        <button>Reveal {gemImage()}</button>
      </td>

    <Modal gem={props.gem}/>


    {/* <td className="p-4 align-middle [&:has([role=checkbox])]:pr-0">
      <div className="flex gap-2">
        <Link
          className="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-slate-100 h-9 rounded-md px-3"
          to={`/edit/${props.gem._id}`}
        >
          Edit
        </Link>
        <button
          className="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-slate-100 hover:text-accent-foreground h-9 rounded-md px-3"
          color="red"
          type="button"
          onClick={() => {
            props.deleteGem(props.gem._id);
          }}
        >
          Delete
        </button>
      </div>
    </td> */}
    </tr>
  );
};

export default GemListItem;
