function FormInput({label, name, type, defaultValue}) {
  return (
    <div className="form-control">
      <label className="label">
        <span className="label-text capitalize">{label}</span>
      </label>
      <input
        type={type}
        name={name}
        defaultValue={defaultValue}
        className="input input-bordered w-full max-w-xs"
      />
    </div>
  )
}
export default FormInput
