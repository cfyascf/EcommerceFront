interface IInputProps {
    htmlFor: string,
    label: string,
    type: string,
    id: string,
    name: string,
    placeholder: string,
    value: any,
    onChange: (e: any) => void
}

export const Input = (props : IInputProps) => {
    return (
        <>
            <label htmlFor={props.htmlFor} className="text-black text-medium">
            {props.label}
          </label>
          <input
            type={props.type}
            id={props.id}
            name={props.name}
            placeholder={props.placeholder}
            className="p-2 border-2 border-pink-600 rounded-lg text-small text-black"
            value={props.value}
            onChange={props.onChange}
          />
        </>
    );
};
