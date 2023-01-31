function Thought(props) {

  return (
    <div style={{ background: 'lightgrey', borderRadius: '10px', margin: '2rem' }}>
      <div style={{ marginLeft:'2rem' }}>
        <p>{props.user} said:</p>
        <hr />
        <p>{props.notes.title}</p>
      </div>
    </div>
  );
}

export default Thought;