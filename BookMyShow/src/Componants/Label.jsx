import Badge from 'react-bootstrap/Badge';

const Label = ({text}) => {
  return (
    <div className="ms-5" >
      <h4 style={{ fontSize: '28px' }}>
        {text}
      </h4>
      <br/>
    </div>
  );
}

export default Label;