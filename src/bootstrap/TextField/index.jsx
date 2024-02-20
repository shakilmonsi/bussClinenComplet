import "./TextField.styles.css";

function TextField({ img = "", alt = "", text = "", Ref, ...rest }) {
  return (
    <div className="input-group mb-3">
      {img && (
        <span className="input-group-text" id="basic-addon1" {...rest}>
          <img src={img} alt={alt} className="inputImage" />
        </span>
      )}
      {text && (
        <span className="input-group-text" id="basic-addon1" {...rest}>
          {text}
        </span>
      )}
      <input className="form-control" ref={Ref} {...rest} />
    </div>
  );
}

export default TextField;
