import React, { useState } from "react";
import ReactFlagsSelect from "react-flags-select";

const CountryDropdown = () => {
  const [selected, setSelected] = useState("NG"); 

  return (
    <div className="absolute left-1 top-4.5 z-10">
      <ReactFlagsSelect
        selected={selected}
        onSelect={(code) => setSelected(code)}
        showSelectedLabel={false}
        showSecondarySelectedLabel={false}
        
        countries={["NG", "US", "GB", "FR", "DE", "CA"]}
        className="country-select p-0! border-none! bg-transparent!"
        selectButtonClassName="!p-0 !border-none !bg-transparent"
      />
    </div>
  );
};

export default CountryDropdown;
