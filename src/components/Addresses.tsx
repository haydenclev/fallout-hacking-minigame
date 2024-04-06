import "../style/Column.css";

interface AddressesProps {
  addresses: string[]
}

function Addresses({ addresses }: AddressesProps ) {
  return (
    <div className="column">
      { addresses.map((address, index) => <p className="address" key={index}>{address}</p>) }
    </div>
  )
}

export default Addresses;