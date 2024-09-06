import './CustomInput.css'
export default function CustomInput({
  id,
  labelText,
  placeholderText,
  type,
  value,
  onChange,
  optional,
  recommended,
  "data-key": dataKey
}) {
  return (
    <div className="input-group">
      <label>
        <span className="label-text"> {labelText} </span>
        {optional && <span className="text-type"> Optional </span>}
        {recommended && <span className="text-type"> Recommended</span>}
      </label>
      {type === "text-area" ? (
      <textarea
        id={id}
        placeholder={placeholderText}
        onChange={onChange}
        value={value}
        data-key={dataKey}
      ></textarea>
      ) : (
      <input
        type={type}
        id={id}
        placeholder={placeholderText}
        onChange={onChange}
        value={value}
        data-key={dataKey}
      ></input>
      )}
    </div>
  );
}
