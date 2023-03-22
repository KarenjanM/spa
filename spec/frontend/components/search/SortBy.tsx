import { useSortBy } from "react-instantsearch-hooks-web";
import Select from 'react-select';

export function SortBy(){
    const {
      initialIndex,
      options,
      refine,
    } = useSortBy({
      items: [
        {
          label: 'Relevanz', value: 'test.default-channel.USD.products'
        },
        {
          label: 'Pres (aufsteigend)', value: 'products_price_asc'
        },
        {
          label: 'Preis (absteigend)', value: 'products_price_desc'
        }
      ]
    });
    return (
      <div>
        <Select 
        options={options}
        defaultValue={options[0]}
        onChange={(e)=>refine(e.value)}
        styles={{
          control: (baseStyles, state)=>({
            ...baseStyles, 
            borderWidth: 0,
            cursor: "pointer",
          }),
          indicatorSeparator: (baseStyles, state)=>({
            display: "none"
          }),
          dropdownIndicator: (baseStyles, state)=>({
            ...baseStyles,
            color: "black",
          })
        }}
        theme={(theme)=>({
          ...theme,
          borderRadius: 0,
          colors: {
            ...theme.colors,
            primary: "black"
          }
        })}
        
        />
      </div>
    )
  }