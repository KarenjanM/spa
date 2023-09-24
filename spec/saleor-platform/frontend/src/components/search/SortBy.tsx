import Select from 'react-select';

export function SortBy({options, refine}){
    return (
        <Select 
        options={options}
        defaultValue={options[0]}
        onChange={(e)=>refine(e.value)}
        styles={{
          control: (baseStyles, state)=>({
            ...baseStyles, 
            borderWidth: 0,
            cursor: "pointer",
            fontSize: "0.9rem",
            lineHeight: "1rem",
            color: "black",
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
    )
  }