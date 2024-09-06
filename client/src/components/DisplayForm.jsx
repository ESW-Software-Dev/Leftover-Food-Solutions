export default function DisplayForm ({
    onChange,
    FormComponent,
    onSubmit,
    id,
    formTitle
}) {
    return (
        <div className="forms-container">
            <h1> {formTitle} </h1>
            <FormComponent
                onChange={onChange}
                onSubmit={onSubmit}
                id={id}
            />
        </div>
    )
}