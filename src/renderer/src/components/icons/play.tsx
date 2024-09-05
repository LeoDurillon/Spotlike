function Play(props: { class?: string }): JSX.Element {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={props.class}
    >
      <polygon points="5 3 19 12 5 21 5 3"></polygon>
    </svg>
  )
}

export default Play